<template>
  <header :class="{'scrolled-nav': scrolledNav}" id="navigation-header">
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
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'rings' }}">
                    Rings
                </router-link>
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'pendants' }}">
                    Pendants
                </router-link>
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'earrings' }}">
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
            <div v-else class="profile-link" id="profile-link">
                <LoggedIn @click="toggleProfileView" class="icon"/>
                <div v-show="profileView" id="profile-popup" class="profile-popup" :class="{'shift': scrolledNav}">
                    <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                    <p class="username">{{this.$store.state.profileUsername}}</p>
                    <router-link v-if="admin" class='admin-link' :to="{ name: 'Admin' }">
                        <Admin class="svg-icon"/>
                        <p>Admin</p>
                    </router-link>
                    <router-link v-if="admin" class='admin-link' :to="{ name: 'CreateProduct' }">
                        <Admin class="svg-icon"/>
                        <p>Create Product</p>
                    </router-link>
                    <router-link class="admin-link" :to="{ name: 'Home' }">
                        <Saved class="svg-icon"/>
                        <p>Saved Items</p>
                    </router-link>
                    <router-link class="admin-link" @click="signOut" :to="{ name: 'Home' }">
                        <Exit class="svg-icon"/>
                        <p>Sign Out</p>
                    </router-link>
                </div>
            </div>
            <Cart @click="toggleCartNav" class="icon"/>
            <Menu @click="toggleMobileNav" v-show="mobile" class="icon" :class="{'icon-active' : mobileNav }"/>
          </div>
          <transition name="mobile-nav">
            <ul v-show="mobileNav" class="dropdown-nav left-nav">
              <div class="side-bar-header">
                <img src="@/assets/logo.png" alt="Logo">
              </div>
              <li>
                <router-link class="link" :to="{ name: 'Home' }">
                    Home
                </router-link>
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'rings' }}">
                    Rings
                </router-link>
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'pendants' }}">
                    Pendants
                </router-link>
                <router-link class="link" :to="{ name: 'Shop', params: { category: 'earrings' }}">
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
          <div v-show="mobileNav" @click="toggleMobileNav" class="nav-overlay" ></div>
          <transition name="cart-nav">
            <ul v-show="cartNav" class="dropdown-nav right-nav">
              <div class="side-bar-header">
                <Cart @click="toggleCartNav" class="cart-icon"/>
                <h1>Your Cart: ({{  this.$store.state.cart.length  }})</h1>
                <Close @click="toggleCartNav" class="icon" :class="{'icon-active' : cartNav }"/>
              </div>
              <li v-for="(product, index) in this.$store.state.cart" :key="product.uniqueID" class="cart-item">
                <router-link class="cart-link" :to="{ name: 'ViewProduct', params: { category: product.category, productId: product.itemID }}">
                    <img class="cart-img" :src="product.itemPicture">
                    <h1 class="cart-itemName">{{ product.itemName }}</h1>
                </router-link>
                <h3 class="cart-metalMat">{{ product.metalMaterial }}</h3>
                <h6 v-if="product.itemDiscount != 0" class="cart-price discount">%{{ (product.itemDiscount * 100).toFixed(0) }} Off</h6>
                <div class="price-container">
                    <h6 v-if="product.itemPrice != product.itemOriginalPrice" class="cart-price original">${{ product.itemOriginalPrice.toFixed(2) }}</h6>
                    <h6 v-if="product.itemPrice != product.itemOriginalPrice" class="cart-price original">-></h6>
                    <h6 class="cart-price">${{ product.itemPrice.toFixed(2) }} </h6>
                </div>
                <h6 class="cart-size-quant">Size: {{ product.itemSize}}, Quantity: {{ product.itemQuantity }}</h6>
                <Close @click="removeCartItem(index)" class="cross"/>
              </li>
            </ul>
          </transition>
          <div v-show="cartNav" @click="toggleCartNav" class="cart-overlay"></div>
      </nav>
  </header>
</template>


<script>
import Menu from "../assets/Icons/menu.svg"
import Login from "../assets/Icons/login.svg"
import LoggedIn from "../assets/Icons/loggedin.svg"
import Cart from "../assets/Icons/cart.svg"
import Exit from  "../assets/Icons/exit.svg"
import Saved from "../assets/Icons/bookmark.svg"
import Admin from "../assets/Icons/admin.svg"
import Close from "../assets/Icons/cross.svg"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebaseInit.js"

export default {
    // NEED TO MAKE THE OVERLAY ON ITEMS THAT AREN'T IN STOCK
    name: "Navigation",
    data() {
        return {
            scrolledNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profileView: null,
            cartNav: null,
        }
    },
    components: {
        Menu,
        Login,
        Cart,
        LoggedIn,
        Exit,
        Saved,
        Admin,
        Close,
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        document.addEventListener('mouseup', (e) => {
            const profileLink = document.getElementById('profile-link');
            if (!profileLink.contains(e.target)) {
                this.profileView = false;
            }
        })
        this.updateScroll();
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        }
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleCartNav() {
            this.cartNav = !this.cartNav;
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
            signOut(auth);
            window.location.reload();
        },
        removeCartItem(index) {
            this.$store.commit("removeCartItem", index);
        },
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
                position: sticky;
                top: 0;
                z-index: 10;
                
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
                    right: -85px;
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    text-align: center;
                    justify-content: space-around;
                    gap: 15px;
                    max-width: 250px;
                    min-width: 200px;
                    background-color: #505050;
                    box-shadow: 0 4px 8px -1px rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.7);
                    transition: 0.1s ease-in-out;

                    p:first-child {
                        margin-top: 20px;
                    }

                    .username {
                        position: relative;
                    }

                    .username::after {
                        content: '';
                        position: absolute;
                        top: 25px;
                        left: 10px;
                        width: 175px;
                        height: 2px;
                        background-color: #fff;
                    }
                    
                    .admin-link {
                        display: flex;
                        flex-direction: row;
                        position: relative;
                        text-decoration: none;
                        color: inherit;
                        padding-left: 15px;
                        
                        p {
                            transition: color 0.3s ease-in-out;
                            margin: 6.4px auto;
                        }

                        p:hover {
                            color: #000;
                        }
                    }

                    .admin-link:last-child {
                        margin-bottom: 10px;
                    }

                }
                .profile-popup::after {
                    content:'';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0px 9px 9px 9px;
                    border-color: transparent transparent #505050 transparent;
                    top: -7px;
                    left: 87.5px;
                }
            }

            .icon {
                user-select: none;
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

        .right-nav {
            right: 0;
            max-width: 300px;
            overflow-y: auto;
            scroll-snap-type: y proximity;
            overscroll-behavior: contain;

            .side-bar-header {
                background-color: #303030;
                min-height: 80px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-bottom: 20px;

                .cart-icon {
                    width: 36px;
                    height: 36px;
                    margin-left: 25px;
                    cursor: pointer;

                    @media(max-width: 700px) {
                        margin-left: 10px;
                    }
                }
                
                h1 {
                    font-size: 1.5rem;
                    margin: 0 auto;
                }

                .icon {
                    fill: white;
                    width: 40px;
                    height: 40px;
                    margin-right: 25px;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.5s ease all;

                    @media(max-width: 700px) {
                        margin-right: 10px;
                    }
                }

                .icon-active {
                    transform: rotate(360deg);
                }
            }

            .cart-item {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0;
                max-width: 300px;
                width: 100%;
                margin-bottom: 20px;
                transition: transform 0.25s ease;
                overflow: visible;
                scroll-snap-align: start;
                scroll-margin-top: 100px;

                .cart-link {
                    text-decoration: none;
                }
                
                .cart-img {
                    height: 200px;
                    width: 200px;
                    margin-bottom: 5px;
                }
                
                .cart-itemName {
                    color: #000;
                    white-space: pre-wrap;
                    font-size: 1.125rem;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    margin: 0 40px;
                }

                .cart-metalMat {
                    color: #888888;
                    white-space: pre-wrap;
                    font-size: 0.875rem;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    margin: 0 40px;
                }

                div.price-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 5px;
                    
                    .cart-price {
                        color: #000;
                        white-space: pre-wrap;
                        font-size: 0.875rem;
                        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    }

                    .original {
                        color: #800000;
                        text-decoration: line-through;
                    }
                }

                .discount {
                    font-size: 0.875rem; 
                    color: #800000;
                }

                
                .cart-size-quant {
                    color: #000;
                    white-space: pre-wrap;
                    font-size: 0.75rem;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    margin: 0 40px;
                }

                .cross {
                    position: absolute;
                    top: 0;
                    right: 4px;
                    fill: #800000;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                }
            }
        }

        .right-nav::-webkit-scrollbar {
            width: 5px;
        }

        .right-nav::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        .right-nav::-webkit-scrollbar-thumb {
            background: #888; 
            border-radius: 2.5px;
        }

        .right-nav::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }

        .left-nav {
            left: 0;
            max-width: 250px;
            z-index: 20;
        }
        
        .dropdown-nav {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: #ebebeb;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.7);
            top: 0;

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

        .nav-overlay {
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

        .cart-overlay {
           position: fixed;
           top: 0;
           right: 300px;
           height: 100vh;
           width: calc(100vw - 300px);
           z-index: 100;
           cursor: pointer;
           @media(max-width: 400px) {
               right: 70vw;
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

        .cart-nav-enter-active,
        .cart-nav-leave-active {
            transition: 1s ease all;
        }

        .cart-nav-enter,
        .cart-nav-leave-to {
            transform: translateX(300px);
        }

        .cart-nav-enter-to,
        .cart-nav-leave {
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

.shift {
    top: 45px !important;
}

.svg-icon {
    position: absolute;
    fill: #fff;
    width: 32px;
    height: 32px;
    display: flex;
    align-self: flex-start;
    left: 3px;
}
</style>