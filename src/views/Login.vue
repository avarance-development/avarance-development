<template>
  <section class="container">
      <form @submit.prevent="login" class="form-wrapper">
          <div class="register-text">
            <p>Don't have an account?</p>
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </div>
          <h1 class='title'>Login to Avarance</h1>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input placeholder="Email" v-model="email" class='input' type="email" name="email" id="email" required="required">
          </div>
          <div class="input-wrapper">
            <Password class='icon'/>
            <input placeholder="Password" v-model="password" class='input' type="password" name="password" id="password" required="required">
          </div>
          <p class='error' v-show="error">{{ error }}</p>
          <router-link class='reset' :to="{ name: 'ResetPassword' }">Forgot Your Password?</router-link>
          <button class='btn' type="submit">Sign In</button>
      </form>
  </section>
</template>

<script>
import Email from "../assets/Icons/email.svg"
import Password from "../assets/Icons/password.svg"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: '',
            error: '',
        }
    },
    components: {
        Email,
        Password,
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                this.$router.push({ name: "Home" })
                this.error = ''
                console.log(firebase.auth().currentUser.uid)
            }).catch((err) => {
                this.error = err.message
            })
        }
    }
}
</script>

<style lang='scss' scoped>

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/photos/blurry.jpg");

    .form-wrapper {
        width: 40vw;
        height: 50vh;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-radius: 25px;
        gap: 10px;

        @media(max-width: 1000px) {
            width: 50vw;
        }
        
        @media(max-width: 700px) {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            border: none;
        }

        .register-text {
            display: inline-flex;
            font-size: 0.75rem;
            gap: 5px;
        }
        
        .title {
            margin-bottom: 10px;
        }

        .input-wrapper {
            border: 1px solid black;
            height: fit-content;
            width: fit-content;
            .icon {
                position: relative;
                top: 4px;
                margin: 0 5px;
            }

            .input {
                position: relative;
                bottom: 7px;
                border: none;
                border-left: 1px solid black;
                text-align: start;
                width: 25vw;
                height: 32px;
                font-size: 1rem;
                padding-left: 5px;

                @media(max-width: 1000px) {
                    min-width: 35vw;
                }

                @media(max-width: 700px) {
                    width: 50vw;
                }
            }
            .input:focus-visible {
                outline: none;
            }
        }

        .error {
            color: red;
        }

        .reset {
            font-size: 0.75rem;
            margin-bottom: 10px;
        }

        .btn {
            width: 10vw;
            height: 32px;
            border-radius: 8px;
            background-color: #fff;
            cursor: pointer;

            @media(max-width: 700px) {
                width: 25vw;
            }
        }
    }
}
</style>