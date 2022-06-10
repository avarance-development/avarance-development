<template>
  <footer class="footer">
      <div class="first">
          <h1 class="title">
              Avarance
          </h1>
          <router-link class="link" :to="{ name: 'Home' }">
            <img src="@/assets/logo.png" alt="Logo">
          </router-link>
          <div class="social-bar">
              <router-link :to="{ name: 'Home' }">
                <YouTube class='icon' :to="{ name: 'Home' }" />
              </router-link>
              <router-link :to="{ name: 'Home' }">
                <Twitter class='icon' :to="{ name: 'Home' }" />
              </router-link>
              <router-link :to="{ name: 'Home' }">
                <Instagram class='icon' :to="{ name: 'Home' }" />
              </router-link>
              <router-link :to="{ name: 'Home' }">
                <Facebook class='icon' :to="{ name: 'Home' }" />
              </router-link>
              <router-link :to="{ name: 'Home' }">
                <TikTok class='icon' :to="{ name: 'Home' }" />
              </router-link>
          </div>
      </div>
      <div class="second">
        <router-link class="link" :to="{ name: 'Home' }">
            Home
        </router-link>
        <router-link class="link" :to="{ name: 'Shop', params: { category: 'rings' }}">
            Rings
        </router-link>
        <router-link class="link" :to="{ name: 'Shop', params: { category: 'pendants' }}">
            Pendants
        </router-link> 
      </div>
      <div class='second adj'>
        <router-link class="link" :to="{ name: 'Shop', params: { category: 'earrings' }}">
            Earrings
        </router-link>
        <router-link class="link" :to="{ name: 'Contact' }">
            Contact
        </router-link>
        <router-link class="link" :to="{ name: '' }">
            FAQ
        </router-link> 
      </div>
      <form class="email-form" @submit.prevent="subscribe">
          <label class="sub" for="Subscription">Stay Updated with our Shop!</label>
          <div class="wrapper">
              <input class="email" placeholder="example@email.com" type="email" name="Subscription" id="Subscription" v-model.lazy="email" autocomplete="off">
              <button class="btn" type="submit">
                Submit
              </button>
          </div>
          <p class="success" v-show="!error && success">Success! Your email has been added.</p>
          <p class="copyright">Copyright 2022 - All Rights Reserved</p>
      </form>
  </footer>
</template>

<script>
import YouTube from "../assets/Icons/Socials/youtube.svg"
import Twitter from "../assets/Icons/Socials/twitter.svg"
import Instagram from "../assets/Icons/Socials/instagram.svg"
import Facebook from "../assets/Icons/Socials/facebook.svg"
import TikTok from "../assets/Icons/Socials/tiktok.svg"

export default {
    name: "Footer",
    data() {
        return {
            email: "",
            error: "",
            success: false
        }
    },
    components: {
        YouTube,
        Twitter,
        Instagram,
        Facebook,
        TikTok
    },
    methods: {
        subscribe() {
            if (this.email) {
                console.log('Subscribed ' + this.email);
                this.success = true;
                this.email = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 250px;
    background-color: #000;

    @media(max-width: 700px) {
        flex-direction: column;
        gap: 10px;
    }

    .first {
        flex-basis: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media(max-width: 700px) {
            margin: 10px 0;
        }

        .title {
            color: white;
            font-size: 1.5rem;
        }
        img {
            width: 50px;
            margin: 20px 0;
        }
        .social-bar {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            gap: 8px;

            .icon {
                width: 24px;
                fill: #ffffff;
                cursor: pointer
            }

        }
    }


    .second {
        flex-basis: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        padding-right: 10px;

        @media(max-width: 700px) {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        .link {
            color: #ffffff;
            text-decoration: none;
            width: fit-content;
            margin: 0 auto 0 0;
            transition: 0.5s ease-in-out;
            
            @media(max-width: 700px) {
                margin: 0;
            }
        }

        .link:hover {
            color: #0081AB;
        }
    }

    .adj {
        @media(max-width: 700px) {
            margin-left: -5px;
        }
    }

    .email-form {
        flex-basis: 55%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;

        @media(max-width: 700px) {
            gap: 10px;
        }

        .sub {
            color: #fff;
            cursor: pointer;
        }
        .wrapper {
            border: white solid 1px;
            border-radius: 17px;
            width: fit-content;
            transition: 0.2s border;
            transform: 0.1s ease-in-out border;

            .email {
                color: #fff;
                text-align: start;
                position: relative;
                border: none;
                outline: none;
                width: 225px;
                height: 32px;
                background-color: #000;
                margin-left: 10px;
                margin-right: 2px;
                caret-color: #fff;

                @media (max-width: 400px) {
                    width: 150px;
                }
            }

            .btn {
                background-color: #fff;
                border: #fff;
                position: relative;
                z-index: 2;
                transform: scale(1.05);
                border-radius: 17px;
                width: 100px;
                height: 36px;
                border-left: black solid 1px;
                cursor: pointer;
            }
        }
        .wrapper:focus-within {
            border: white solid 2px;
        }

        .success {
            color: green;
        }

        .copyright {
            color: white;
            margin-bottom: 20px;
        }
    }
}
</style>