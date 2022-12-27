const functions = require("firebase-functions");
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const db = admin.firestore();
const SEND_GRID_API_KEY = functions.config().sendgrid.api_key;
const TEMPLATE_ID = functions.config().sendgrid.template_id;
const RECEIPT_TEMPLATE_ID = functions.config().sendgrid.receipt_template_id;
sgMail.setApiKey(SEND_GRID_API_KEY);


exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin!`
        }
    }).catch((err) => {
        return {
            message: err.message
        }
    })
})

exports.retrieveCustomer = functions.https.onCall(async (data, context) => {
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.sessions.retrieve(data.id);
    const customer = await stripe.customers.retrieve(session.customer);
    return { 
        city: customer.address.city,
        country: customer.address.country,
        state: customer.address.state,
        email: customer.email,
        name: customer.name,
        total: session.amount_total,
        session: session,
    }
})

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {

    for(const item of data.cart) {
        const itemFromDB = await db.doc(`products/${item.itemID}`).get()
        const itemPrice = parseInt(itemFromDB.data().itemPrice * 100);
        item.unit_amount = itemPrice
    }

    const itemsToBuy = data.cart.map((item) => {

        return {
            quantity: item.itemQuantity,
            price_data: {
                currency: "usd",
                unit_amount: item.unit_amount,
                product_data: {
                    name: item.itemName,
                },
                tax_behavior: "exclusive",
            }
        }
    })


    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:8080/success/{CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:8080/",
        shipping_address_collection: {
            allowed_countries: ['US'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 499,
                        currency: 'usd',
                    },
                    display_name: 'Standard Shipping',
                    // Delivery between 7-14 business days
                    delivery_estimate: {
                        minimum: {
                        unit: 'business_day',
                        value: 7,
                        },
                        maximum: {
                        unit: 'business_day',
                        value: 14,
                        },
                    },
                    tax_behavior: "exclusive",
                }
            },
        ],
        line_items: itemsToBuy,
        automatic_tax: {
            enabled: true
        },
        metadata: {
            paymentID: data.paymentID
        },
        // Set to expire in an hour
        expires_at: Math.floor(Date.now() / 1000) + (3600 * 1),
    });

    return {
        id: session.id
    }
})

exports.expireSession = functions.https.onCall(async (data, context) => {
    try {
        const stripe = require("stripe")(functions.config().stripe.secret_key);
        await stripe.checkout.sessions.expire(data.id);
    } catch(err) {
        return { success: false, error: error.message }
    }

    return {  success: true  }
})

exports.emailFeedback = functions.https.onCall(async (data, context) => {

    if (!context.auth && !context.auth.token.email) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged in with an email address');
    }

    const msg = {
        to: 'avarancedev@gmail.com',
        from: {
            email: 'avarancedev@gmail.com'
        },
        subject: 'Post Checkout Form Response',
        templateId: TEMPLATE_ID,
        dynamic_template_data: {
            name: data.name,
            email: data.email,
            msg: data.msg,
        }
    }
    
    try { 
        await sgMail.send(msg);
    } catch (error) {
        return { success: false, error: error.message }
    }

    return { success: true  };
})

exports.emailReceipt = functions.https.onCall(async (data, context)=> { 

    const msg = {
        to: data.email,
        from: {
            email: 'avarancedev@gmail.com'
        },
        subject: 'Recent Receipt from Avarance',
        templateId: RECEIPT_TEMPLATE_ID,
        dynamic_template_data: {
            name: data.name,
            email: data.email,
            sessionId: data.sessionId,
            date: data.date,
            total: data.total,
            cart: data.cart,
        }
    }
    
    try { 
        await sgMail.send(msg);
    } catch (error) {
        return { success: false, error: error.message }
    }

    return { success: true  };
})

// Unfinished function
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const whSecret = functions.config().stripe.payments_webhook_secret;
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            req.headers["stripe-signature"],
            whSecret,
        )
    } catch(err) {
        console.error("Webhook verification Failed!")
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const paymentID = session.metadata.paymentID;

            db.doc(`paymentIntent/${paymentID}`).get().then(async (doc) => {
                const paymentCart = doc.data().cart;
                const batch = db.batch();
                try {
                    for (const item of paymentCart) {
    
                        const docRef = db.doc(`products/${item.itemID}`)
                        const itemInfo = await docRef.get();
                        const itemData = itemInfo.data();
                        const size = ((item.itemSize).toString()).replace('.', '');
                        const dbQuantity = itemData.itemSizes[size];
                        const cartQuantity = item.itemQuantity;
    
                        if (dbQuantity - cartQuantity < 0) {
                            throw `${item.itemName}'s quantity has been reduced to ${dbQuantity}`;
                        } else {
                        
                            const sizesRoute = 'itemSizes.' + size;
                            const newQuant = dbQuantity - cartQuantity;
                            batch.update(docRef, { [sizesRoute] : newQuant});
    
                            if (newQuant == 0) {
                                const boolRoute = 'sizesBool.' + size;
                                batch.update(docRef, { [boolRoute] : false });
                            }
                            const remainingTotalQuant = itemData.itemTotalQuantity - cartQuantity;
                            batch.update(docRef, { "itemTotalQuantity" : remainingTotalQuant })
                            
                            if (remainingTotalQuant == 0) {
                                batch.update(docRef, { "itemInStock" : false });
                            }
                            const popularityInc = itemData.popularity + cartQuantity;
                            batch.update(docRef, { "popularity" : popularityInc });
                        }
                    }
                } catch (error) {
                    return res.status(400).send(`Webhook Error: ${error.message}`);
                }

                await batch.commit();
            });
            
            await admin.firestore().collection("orders").doc(paymentID).set({
                checkoutSessionId: session.id,
                paymentStatus: session.payment_status,
                shippingInfo: session.shipping,
                amountTotal: Number((session.amount_total / 100).toFixed(2)),
                timestamp: db.ServerValue.TIMESTAMP,
            })

            break;
        case 'checkout.session.expired':
            break;
        default:
            break;
    }

    return res.sendStatus(200);
})