const functions = require("firebase-functions");
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const db = admin.firestore();
const SEND_GRID_API_KEY = functions.config().sendgrid.api_key;
const TEMPLATE_ID = functions.config().sendgrid.template_id;
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

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {

    // TODO: In the future, try and see if we can get the commented code to work over the code down below
    // currently, we cannot use doc to get the existing item that we want out of the database for unknown reasons

    // for(const item of data.cart) {
    //     const itemFromDB = await db.collection("products").doc(item.itemID).get()
    //     const itemPrice = itemFromDB.data().itemPrice * 100;
    //     item.unit_amount = itemPrice
    // }

    for(const item of data.cart) {
        const result = await db.collection("products").where("itemID", "==", item.itemID).get();
        // console.log("result", result)
        let itemPrice = 0;
        result.forEach((doc) => {
            // console.log("parsed int", parseInt(doc.data().itemPrice * 100))
            itemPrice = parseInt(doc.data().itemPrice * 100)   
        })
        // if (itemPrice == 0) {
        //     throw new functions.https.HttpsError('failed-precondition', 'One of the items in your cart does not exist');
        // }
        item.unit_amount = itemPrice;
        // console.log("unit amount", item.unit_amount)
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

    // console.log("items to buy", itemsToBuy)


    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:8080/success",
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
                    // Delivers between 7-14 business days
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
        // Set to expire in an hour
        expires_at: Math.floor(Date.now() / 1000) + (3600 * 1),
    });

    return {
        id: session.id
    }
})

// Function has not been debugged and worked through
exports.emailFeedback = functions.https.onCall(async (data, context)=> {

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

// Unfinished function
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    console.log("WEBHOOK")
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const whSecret = functions.config().payments_webhook_secret;
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            req.headers["stripe-signature"],
            whSecret,
        )
    } catch(err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            console.log("COMPLETED")
            //   const session = event.data.object;
            await admin.firestore().collection("orders").doc().set({
                checkoutSessionId: dataObject.id,
                paymentStatus: dataObject.payment_status,
                shippingInfo: dataObject.shipping,
                amountTotal: dataObject.amount_total,
            })
            break;
        case 'checkout.session.expired':
            //   const session = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
        default:
          console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200)
})