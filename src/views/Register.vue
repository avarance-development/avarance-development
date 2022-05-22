<template>
  <section class="container">
      <form @submit.prevent="register" class="form-wrapper">
          <div class="register-text">
            <p>Already Have an Account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <h1 class='title'>Register an Account</h1>
          <div class="input-wrapper">
            <Login class='icon'/>
            <input placeholder="First Name" v-model="firstname" class='input' type="text" name="firstname" required="required">
          </div>
          <div class="input-wrapper">
            <Login class='icon'/>
            <input placeholder="Last Name" v-model="lastname" class='input' type="text" name="lastname" required="required">
          </div>
          <div class="input-wrapper">
            <Login class='icon'/>
            <input placeholder="Username" v-model="user" class='input' type="text" name="user" required="required">
          </div>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input placeholder="Email" v-model="email" class='input' type="email" name="email" required="required">
          </div>
          <div class="input-wrapper">
            <Password class='icon'/>
            <input placeholder="Password" v-model="password" class='input' type="password" name="password" required="required">
          </div>
          <p class='error' v-show="error">{{ error }}</p>
          <router-link class='reset' :to="{ name: 'ResetPassword' }">Forgot Your Password?</router-link>
          <button class='btn' type="submit">Sign Up</button>
      </form>
  </section>
</template>

<script>
import Email from "../assets/Icons/email.svg"
import Password from "../assets/Icons/password.svg"
import Login from "../assets/Icons/login.svg"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase/firebaseInit.js"

export default {
    name: "Register",
    data() {
        return {
            firstname: '',
            lastname: '',
            user: '',
            email: '',
            password: '',
            error: '',
        }
    },
    components: {
        Email,
        Password,
        Login,
    },
    methods: {
        async register() {
            this.error = '';
            const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password);
            const result = await createUser;
            const docRef = doc(db, 'users', result.user.uid)
            await setDoc(docRef, {
                firstName: this.firstname,
                lastName: this.lastname,
                username: this.user,
                email: this.email,
            });
            this.$router.push({ name: "Home" });
            return;

            // this.error = '';
            // const firebaseAuth = await firebase.auth();
            // const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
            // const result = await createUser;
            // const dataBase = db.collection("users").doc(result.user.uid);
            // await dataBase.set({
            //     firstName: this.firstname,
            //     lastName: this.lastname,
            //     username: this.user,
            //     email: this.email,
            // });
            // this.$router.push({ name: "Home" });
            // return;
        },
    },
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
        height: 70vh;
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
                fill: black;
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
                    width: 35vw;
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