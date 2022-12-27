<template>
    <div class="wrapper">
        <div class="success-wrapper">
            <Loading v-show="loading"/>
            <div class="info">
                <h1 class='title'>The Checkout Session was Successful!</h1>
                <h6 class='receipt'>A receipt has been sent to the supplied email address</h6>
                <p class='id'><strong class='bold'>Session No. </strong>{{ this.$route.params.sessionID }}</p>
                <div class="grid">
                    <div class="your-info">
                        <h6>Your Information</h6>
                        <p>{{  clientName  }}</p>
                        <p>{{  email  }}</p>
                    </div>
                    <div class="shipping-info">
                        <h6>Shipping Address</h6>
                        <p>*Street Name omitted*</p>
                        <p>{{ city }}, {{  state }}, {{  country  }}</p>
                    </div>
                    <div class="shipping-method">
                        <h6>Standard Delivery</h6>
                        <p>Total: ${{ (total/100).toFixed(2) }}</p>
                        <p>7-14 days</p>
                    </div>
                </div>
                <p>Estimated Arrival: {{ dateRange }} </p>
                <p>Reach out through the contacts tab if the delivery takes longer than stated</p>
                <p>Check through All Mail if receipt has gone missing</p>
            </div>
            <div class="form">
                <Form :title="title" :subtitle="subtitle"/>
            </div>
        </div>
        <div class="receipt-wrapper">
            <div class="receipt-item" v-for="(item, index) in cart" :key="index">
                <img class="item-image" :src="item.itemPicture" alt="Item Picture">
                <h1 class='item-title'>{{  item.itemName  }}</h1>
                <h6 class='item-material'>Metal Material: {{  item.itemMetalMaterial  }}</h6>
                <h4 class='item-price'>Price: ${{  item.itemPrice.toFixed(2)  }}</h4>
                <h6 class='quant-size'>Quantity: {{  item.itemQuantity  }}, Size: {{  item.itemSize  }}</h6>
            </div>
        </div>
    </div>
</template>

<script>
import Form from "../components/Form.vue"
import Loading from "../components/Loading.vue"
import { functions } from "../firebase/firebaseInit.js"
import { httpsCallable } from "firebase/functions"

export default {
    name: 'Success',
    data() {
        return {
            title: 'Run into any issues?',
            subtitle: 'Tell us in the form below',
            loading: null,
            city: "",
            country: "",
            state: "",
            email: "",
            clientName: "",
            total: "",
            cart: [],
            canSendReceipt: false,
        }
    },
    components: {
        Form,
        Loading,
    },
    props: ["sessionID"],
    computed: {
        dateRange() {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            const beginString = date.toLocaleDateString()

            const date2 = new Date();
            date2.setDate(date2.getDate() + 14);
            const endString = date2.toLocaleDateString();

            return beginString + ' - ' + endString
        }
    },
    async created() {
        this.loading = true;
        const retrieveCustomer = await httpsCallable(functions, 'retrieveCustomer');
        retrieveCustomer({ id: this.$route.params.sessionID }).then(async (result) => {
            this.city = result.data.city;
            this.country = result.data.country;
            this.state = result.data.state;
            this.email = result.data.email;
            this.clientName = result.data.name;
            this.total = result.data.total;
            if (this.$store.state.cart.length > 0) {
                this.cart = this.$store.state.cart;
                this.canSendReceipt = true;
            }
            if (this.canSendReceipt) {
                const emailReceipt = await httpsCallable(functions, 'emailReceipt');
                const event = new Date(Date.now());
                const timeStamp = event.toLocaleString(undefined, { timeZone: 'UTC' }) + " UTC";
                emailReceipt(
                { 
                    name: this.clientName, 
                    email: this.email, 
                    sessionId: this.$route.params.sessionID,   
                    timestamp: timeStamp,
                    cart: this.cart,
                    total: (this.total / 100).toFixed(2),
                }).then((result) => {
                    this.canSendReceipt = false;
                }).catch((err) => {
                    //
                })
            }
            this.$store.commit("clearCart");
            this.loading = false;
        })

        this.$store.commit('setSessionID', null)

    }
}
</script>

<style lang='scss' scoped>
* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.wrapper {
    display: flex;
    flex-direction: column;

    .success-wrapper {
        display: flex;
        flex-direction: row;
        padding-top: 80px;
        width: 100%;
        
        @media(max-width: 700px) {
            flex-direction: column;
        }
    
        .info {
            flex-basis: 50%;
            padding: 50px 0 0 25px;
            display: flex;
            flex-direction: column;
    
            @media (max-width: 700px) {
                padding-bottom: 25px;
                border-bottom: 1px solid black;
            }
    
            .title {
                font-size: 2rem;
            }
    
            .receipt {
                font-size: 0.75rem;
            }
    
            .id {
                margin-left: 10%;
                width: 80%;
                margin-top: 2rem;
                line-height: 1.25rem;
                word-break: break-all;
                overflow-wrap: break-word;
    
                .bold {
                    font-weight: bold;
                }
            }
    
            .grid {
                display: grid;
                justify-content: center;
                grid-template-columns: repeat(auto-fill, minmax(175px, 0.5fr));
                gap: 20px;
                margin: 25px 0;
    
                div h6 {
                    font-size: 1rem;
                }
    
                div p {
                    margin-top: 0.25rem;
                    font-size: 0.75rem;
                }
            }
        }
    
        .form {
            flex-basis: 50%;
            padding: 0 10% 0 10px;
            margin-top: 50px;
    
            @media(max-width: 700px) {
                margin-top: 25px;
                padding: 0 5%;
            }
        }
    }

    .receipt-wrapper {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, minmax(300px, 0.5fr));
        gap: 20px;
        margin: 0 25px 25px 50px;
        padding-top: 25px;
        border-top: 1px solid black;

        .receipt-item {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .item-title {

            }

            .item-material {
                font-size: 0.75rem;
                color: #888888;
            }

            .item-price {
                font-size: 1.125rem;
            }

            .quant-size {
                font-size: 0.75rem;
            }
        }
    }
}
</style>