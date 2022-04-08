<template>
  <header :class="{'scrolled-nav': scrolledNav}" >
      <nav>
          <div class="branding">
            <router-link class="link" :to="{ name: 'Home' }">
              <img src="@/assets/logo.png" alt="Logo">
            </router-link>
          </div>
          <ul v-show="!mobile" class="navigation">
              <li>
                  <router-link class="link" :to="{ name: 'Home' }">
                      Home
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Rings
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Pendants
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Earrings
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Contact
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      FAQ
                  </router-link>
              </li>
          </ul>
          <div class="icon-bar">
            <router-link v-if="!user" class="profile-link" :to="{ name: 'Login' }">
                <Login class="icon" :to="{ name: 'Login'}" />
            </router-link>
            <div v-else class="profile-link">
                <LoggedIn @click="toggleProfileView" class="icon"/>
                <div v-show="profileView" class="profile-popup">
                    <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                    <p>{{this.$store.state.profileUsername}}</p>
                    <p>Saved Items</p>
                    <p @click="signOut" style="cursor: pointer">Sign Out</p>
                </div>
            </div>
            <Cart class="icon"/>
            <Menu @click="toggleMobileNav" v-show="mobile" class="icon" :class="{'icon-active' : mobileNav }"/>
          </div>
          <transition name="mobile-nav">
            <ul v-show="mobileNav" class="dropdown-nav">
              <div class="side-bar-header">
                <img src="@/assets/logo.png" alt="Logo">
              </div>
              <li>
                  <router-link class="link" :to="{ name: 'Home' }">
                      Home
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Rings
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Pendants
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Earrings
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      Contact
                  </router-link>
                  <router-link class="link" :to="{ name: '' }">
                      FAQ
                  </router-link>
              </li>
            </ul>
          </transition>
          <div v-show="mobileNav" @click="toggleMobileNav" class="overlay" ></div>
      </nav>
  </header>
</template>


<script>
import Menu from "../assets/Icons/menu.svg"
import Login from "../assets/Icons/login.svg"
import LoggedIn from "../assets/Icons/loggedin.svg"
import Cart from "../assets/Icons/cart.svg"
import { getAuth, signOut } from "firebase/auth"
import { firebaseApp } from "../firebase/firebaseInit.js"

export default {
    name: "Navigation",
    data() {
        return {
            scrolledNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profileView: null,
        }
    },
    components: {
        Menu,
        Login,
        Cart,
        LoggedIn,
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        this.updateScroll();
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleProfileView() {
            this.profileView = !this.profileView;
        },
        updateScroll() {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                this.scrolledNav = true;
            } else {
                this.scrolledNav = false;
            }
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) {
                this.mobile = true;
            } else {
                this.mobile = false;
                this.mobileNav = false;
            }
        },
        signOut() {
            const auth = getAuth(firebaseApp);
            signOut(auth);
            window.location.reload();
            // firebase.auth().signOut();
            // window.location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    background-color: rgba(0,0,0,0.8);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color: #fff;

    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 12px 0;
        transition: 0.5 ease all;
        width: 90%;
        margin: 0 auto;

        .branding {
            display: flex;
            align-items: center;
            flex-basis: 40%;
            img {
                width: 50px;
                transition: 0.5s ease all;
                cursor: pointer;
            }
        }

        ul {
            display: flex;
            align-items: center;
            flex-basis: 60%;
            white-space: nowrap;
            list-style: none;
            
            .side-bar-header {
                width: 100%;
                background-color: #800000;
                min-height: 100px;
                
                img {
                    position: relative;
                    top: 25px;
                    width: 50px;
                }
            }

            .link {
                font-weight: 500;
                color: #fff;
                list-style: none;
                text-decoration: none;
                font-size: 0.9375rem;
                transition: 0.5s ease all;
                margin-right: 15px;
                text-transform: uppercase;
                margin-left: 16px;
                font-family: inherit;
                
                &:hover {
                    color: #0081AB;
                }
            }
            
        }

        .icon-bar {
            margin-left: 2vw;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-basis: 10%;
            transition: 0.5s ease all;
            
            .profile-link {
                height: 32px;
                position: relative;

                .profile-popup {
                    position: absolute;
                    top: 50px;
                    right: -50px;
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    text-align: center;
                    justify-content: space-around;
                    gap: 15px;
                    max-width: 250px;
                    width: 150px;
                    background-color: #303030;
                    box-shadow: 0 4px 8px -1px rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.7);

                    p {
                        position: relative;
                        margin: 0 10px;
                    }

                    p:first-child {
                        margin-top: 10px;
                    }

                    p:last-child {
                        margin-bottom: 10px;
                    }

                    p:nth-child(3)::after {
                        content:'';
                        position:absolute;
                        top: -10px;
                        left: 5px;
                        width: 125px;
                        height: 2px;
                        background-color: #fff;
                    }

                }
                .profile-popup::after {
                    content:'';
                    position:absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0px 9px 9px 9px;
                    border-color: transparent transparent #303030 transparent;
                    top: -7px;
                    left: 75px;
                }
            }

            .icon {
                cursor: pointer;
                transition: 0.5s ease all;
            }

            .icon-active {
                transform: rotate(180deg);
            }
            
            @media(max-width: 750px) {
                flex-basis: 100%;
                justify-content: flex-end;
            }
        }
        
        .dropdown-nav {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: fixed;
            width: 100%;
            max-width: 250px;
            height: 100%;
            background-color: #ebebeb;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.7);
            top: 0;
            left: 0;
            @media(max-width: 400px) {
                max-width: 70vw;
            }
            li {
                padding-left: 25%;
                padding-top: 10%;
                padding-bottom: 10%;
                padding-right: 96.5px;
                overflow-x: hidden;
                overflow-y: auto;
                scroll-behavior: smooth;

                .link {
                    color: #000;
                    display: table;
                    margin: 35px 0 0 0;
                    position: relative;
                }

                .link:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 1.5px;
                    bottom: 0;
                    left: 0;
                    background-color: #000;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                }

                .link:hover:after,
                .link:active:after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }
            }
            
            li::-webkit-scrollbar {
                width: 5px;
            }

            li::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            
            li::-webkit-scrollbar-thumb {
                background: #888; 
                border-radius: 2.5px;
            }

            li::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
        }

        .overlay {
           position: fixed;
           top: 0;
           left: 250px;
           height: 100vh;
           width: calc(100vw - 250px);
           z-index: 100;
           cursor: pointer;
           @media(max-width: 400px) {
               left: 70vw;
               width: 30vw;
           }
        }

        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: 1s ease all;
        }

        .mobile-nav-enter,
        .mobile-nav-leave-to {
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to,
        .mobile-nav-leave {
            transform: translateX(0);
        }
    }
}

.scrolled-nav {
    background-color: #000;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);

    nav {
        padding: 8px 0;

        .branding {
            img {
                width: 40px;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
            }
        }
    }
}

</style>