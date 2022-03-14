<template>
  <section class="container">
      <form @submit.prevent="login" class="form-wrapper">
          <div class="register-text">
            <p>Already Have an Account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <h1 class='title'>Register an Account</h1>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input v-model="email" class='input' type="email" name="email" id="email">
          </div>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input v-model="email" class='input' type="email" name="email" id="email">
          </div>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input v-model="email" class='input' type="email" name="email" id="email">
          </div>
          <div class="input-wrapper">
            <Password class='icon'/>
            <input v-model="password" class='input' type="password" name="password" id="password">
          </div>
          <router-link class='reset' :to="{ name: 'ResetPassword' }">Forgot Your Password?</router-link>
          <button class='btn' type="submit">Sign In</button>
      </form>
  </section>
</template>

<script>
import Email from "../assets/Icons/email.svg"
import Password from "../assets/Icons/password.svg"

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
            if (this.email && this.password) {
                console.log('Logged in! ' + this.email + ' ' + this.password);
                this.email = '';
                this.password = '';
            } else {
                this.error
            }
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
        height: 70vh;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-radius: 25px;
        gap: 10px;

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
                @media(max-width: 700px) {
                    width: 50vw;
                }
            }
            .input:focus-visible {
                outline: none;
            }
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