<template>
    <div class="wrapper">
        <Loading v-show="loading"/>
        <Modal :modalMessage="error" v-show="error" @close-modal="closeModal"/>
        <h1 class='title'>{{  title  }}</h1>
        <h3 class='subtitle'>{{ subtitle  }}</h3>
        <input type="text" placeholder="Enter your Name" required="true" v-model="name">
        <input type="text" placeholder="Enter your email address" required="true" v-model="email">
        <textarea rows="10" placeholder="Enter your message..." required="true" v-model="msg"></textarea>
        <p class='warning'>*Must be a logged-in user in order to send forms</p>
        <button @click="submitForm">Submit</button>
    </div>
</template>

<script>
import Loading from "../components/Loading.vue"
import Modal from "../components/Modal.vue"
import { httpsCallable } from "firebase/functions"
import { functions } from "../firebase/firebaseInit.js"

export default {
    name: 'Form',
    data() {
        return {
            name: "",
            email: "",
            msg: "",
            error: "",
            loading: false,
        }
    },
    props: {
       title: String,
       subtitle: {
           type: String,
           default: "",
       },
    },
    components: {
        Loading,
        Modal,
    },
    methods: {
        async submitForm() {
            this.loading = true;
            const emailFeedback = await httpsCallable(functions, 'emailFeedback');
            emailFeedback({ email: this.email, name: this.name, msg: this.msg }).then((result) => {
                if (result.data.success) {
                    this.error = "Success! An email has been sent out, detailing your concerns"
                } else {
                    this.error = result.data.error
                }
            })
            this.name = "";
            this.email = "";
            this.msg = ""
            this.loading = false;
        },
        closeModal() {
            this.error = "";
        }
    }
}
</script>

<style lang='scss' scoped>
* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
        font-size: 2rem;
    }

    input {
        text-align: start;
        font-size: 1rem;
        background-color: #F1F1F1;
        padding: 0.5rem;
        border: none;
        color: black;
    }

    input:hover,
    input:active,
    input:focus,
    textarea:hover,
    textarea:active,
    textarea:focus {
        outline: none;
    }

    textarea {
        text-align: start;
        font-size: 1rem;
        resize: none;
        background-color: #F1F1F1;
        padding: 0.5rem;
        border: none;
        color: black;
    }
    
    button {
        margin-top: 10px;
        margin-left: calc(50% - 125px/2);
        background-color: #f0f0f0;
        border: 1px solid #999999;
        width: 125px;
        height: 30px;
        cursor: pointer;
    }
}
</style>