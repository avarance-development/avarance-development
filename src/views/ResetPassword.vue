<template>
  <section class="container">
      <form @submit.prevent="login" class="form-wrapper">
          <div class="register-text">
            <p>Remembered your Password?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <h1 class='title'>Reset Your Password</h1>
          <div class="input-wrapper">
            <Email class='icon'/>
            <input v-model="email" class='input' type="email" name="email" id="email">
          </div>
          <button class='btn' type="submit">Reset</button>
      </form>
  </section>
</template>

<script>
import Email from "../assets/Icons/email.svg"

export default {
    name: 'ResetPassword',
    data() {
        return {
            email: '',
        }
    },
    components: {
        Email,
    },
    methods: {
        resetPassword() {
            if (this.email) {
                console.log('button works')
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
        height: 50vh;
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

        .btn {
            margin-top: 15px;
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