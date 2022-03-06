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
        <router-link class="link" :to="{ name: '' }">
            Rings
        </router-link>
        <router-link class="link" :to="{ name: '' }">
            Pendants
        </router-link> 
      </div>
      <div class="second">
        <router-link class="link" :to="{ name: '' }">
            Earrings
        </router-link>
        <router-link class="link" :to="{ name: '' }">
            Contact
        </router-link>
        <router-link class="link" :to="{ name: '' }">
            FAQ
        </router-link> 
      </div>
      <div class="third">
        <form class="email-form" action="">
            <label class="sub" for="Subscription">Subscribe to Our Weekly Newsletter</label><br>
            <div class="wrapper">
              <input class="email" type="email" name="Subscription" id="Subscription">
              <input class="btn" type="button" value="Submit">
            </div>
            <p>CopyRight 2022 All Rights Reserved</p>
        </form>
      </div>
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
    components: {
        YouTube,
        Twitter,
        Instagram,
        Facebook,
        TikTok
    }
}
</script>

<style lang="scss" scoped>

.footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 200px;
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
        flex-basis: 12.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        padding-right: 10px;

        @media(max-width: 700px) {
            position: relative;
            flex-direction: row;
            justify-content: center;
            align-items: center;
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
    .third {
        flex-basis: 50%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        @media(max-width: 700px) {
            flex-direction: column;
            margin-top: 40px;
        }

        .email-form {
            white-space: nowrap;
            position: relative;
            bottom: 20px;
            .sub {
                color: #fff;
                position: relative;
                bottom: 5px;
                left: 10px;
                @media(max-width: 700px) {
                    bottom: 15px;
                }
            }
            .wrapper {
                border: white solid 1px;
                border-radius: 19px;
                width: fit-content;
                position: absolute;
                transition: 0.2s border;
                margin: 1px;
                
                @media(max-width: 700px) {
                    position: relative;
                    left: 10px;
                }
                .email {
                    z-index: 1;
                    color: #fff;
                    text-align: start;
                    border-radius: 0;
                    left: 10px;
                    position: relative;
                    border: none;
                    outline: none;
                    width: 225px;
                    height: 32px;
                    bottom: 2.5px;
                    background-color: #000;
                    margin-top: 10px;
                }

                .btn {
                    position: relative;
                    margin-left: 10px;
                    z-index: 2;
                    border-radius: 19px;
                    width: 80px;
                    height: 32px;
                    top: -5px;
                    border-left: black solid 1px;
                    cursor: pointer;
                    margin-right: 5px;
                }
            }
            .wrapper:focus-within {
                border: white solid 2px;
                margin: 0;
            }

            p {
                color: white;
                position: relative;
                top: 60px;
                left: 10px;
                @media(max-width: 700px) {
                    top: 10px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>