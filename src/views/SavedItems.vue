<template>
    <div class="container">
        <div class="title-wrapper">
            <h1 class="title">Saved Items</h1>
            <div class="button-wrapper">
                <router-link :to="{ name: 'Shop', params: { category: 'all' }}">
                    <button class="shopping">Continue Shopping</button>
                </router-link>
                <router-link :to="{ name: 'Home' }">
                    <button class="checkout">Checkout</button>
                </router-link>
            </div>
        </div>
        <transition name="swap" mode="out-in">
            <transition-group v-if="this.$store.state.starredItems.length > 0" tag="div" appear name="fade" class="item-wrapper">
                <div class="starred-item" v-for="(item, index) in this.$store.state.starredItems" :key="item.itemID">
                    <div class="image-title">
                        <router-link :to="{ name: 'ViewProduct', params: { category: item.itemName.split(' ').pop().toLowerCase(), productId: item.itemID }}">
                            <img class="item-photo" :src="item.itemPictures[0]" alt="Item Photo">
                        </router-link>
                        <div class="item-desc">
                            <div class="starred">
                                <router-link class="link" :to="{ name: 'ViewProduct', params: { category: item.itemName.split(' ').pop().toLowerCase(), productId: item.itemID }}">
                                    <h1>{{ item.itemName }}</h1>
                                </router-link>
                                <Star class="icon" @click="removeItem(index)"/>
                            </div>
                            <h6 class="material">{{ item.metalMaterial }}</h6>
                            <h6 class="kind" v-if="item.oneOfAKind">One Of A Kind</h6>
                            <h6>Total Remaining: {{ item.itemTotalQuantity }}</h6>
                            <p v-if="item.filters.length > 0">Filters</p>
                            <h6 class="filters" v-for="(key, index) in item.filters" :key="index">{{ key }}</h6>
                        </div>
                    </div>
                    <div class="price-quant">
                        <h6 v-if="item.itemDiscount != 0" class="product-price discount">%{{ (item.itemDiscount * 100).toFixed(0) }} Off</h6>
                        <div class="price-container">
                            <h6 v-if="item.itemPrice != item.itemOriginalPrice" class="product-price original">${{ item.itemOriginalPrice.toFixed(2) }}</h6>
                            <h6 v-if="item.itemPrice != item.itemOriginalPrice" class="product-price original">-></h6>
                            <h6>${{ item.itemPrice.toFixed(2) }}</h6>
                        </div>
                    </div>
                </div>
            </transition-group>
            <p class="error" v-else>You have no items saved so far, save some items by clicking the star on their page!</p>
        </transition>
        <!-- <h1>History</h1>
        <div class="history-items" v-for="(item, index) in paymentHistory" :key='index'>

        </div> -->
    </div>
</template>

<script>
import Star from "../assets/Icons/star.svg"
// History is yet to be instantiated until a reliable way to attach orders to users (getting the userID in a request function)
// import { doc, getDoc, collection } from "firebase/firestore"
// import { db } from "../firebase/firebaseInit.js"

export default {
    name: 'SavedItems',
    data() {
        return {
            // paymentHistory: null,
        }
    },
    components: {
       Star
    },
    methods: {
        removeItem(index) {
            this.$store.commit("removeItemFromStarred", index);
        }
    },
    computed: {
        category() {
            const lastword = this.$route.params.category.split(' ').pop().toLowerCase();
            return lastword;
        }
    },
}
</script>

<style lang='scss' scoped>

.container {
    width: 100%;
    min-height: 100vh;

    .title-wrapper {
        padding: 90px 8% 25px 8%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 460px) {
            flex-direction: column;
        }

        .title {
            font-size: 1.75rem;
        }

        .button-wrapper {
            display: flex;
            flex-direction: row;
            gap: 2px;
            

            button {
                width: 100px;
                height: 45px;
                color: #fff;
                cursor: pointer;
            }
            
            .shopping {
                background-color: #800000;
            }

            .checkout {
                background-color: #111111;
            }
        }
    }
    
    .error {
        position: relative;
        top: 100px;
        padding: 0 10%;
    }

    .item-wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin: 0 8%;
        padding-bottom: 25px;

        .starred-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border: 1px solid black;

            @media (max-width: 700px) {
                flex-direction: column;
            }

            .image-title {
                display: flex;
                flex-direction: row;
                gap: 5px;

                @media (max-width: 700px) {
                    flex-direction: column;
                    align-items: center;
                }

                .item-photo {
                    width: 200px;
                    height: 200px;
                }

                .item-desc {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;

                    .starred {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 5px;

                        .link {
                            text-decoration: none;
                            color: #000;
                        }

                        h1 {
                            margin-left: 10px;
                            font-size: 1.5rem;

                            @media(max-width: 700px) {
                                margin-left: 0;
                                text-align: center;
                            }
                        }

                        .icon {
                            min-width: 40px;
                            min-height: 40px;
                            max-width: 40px;
                            min-width: 40px;
                            fill: gold;
                            cursor: pointer;
                        }
                    }

                    p {
                        text-align: start;
                        margin-left: 10px;

                        @media (max-width: 700px) {
                            text-align: center;
                            margin-left: 0;
                        }
                    }

                    h6 {
                        font-size: 0.875rem;
                        margin-left: 10px;
                        text-align: start;

                        @media(max-width: 700px) {
                            text-align: center;
                            margin-left: 0;
                        }
                    }

                    .filters {
                        font-weight: bold;
                    }

                    .material {
                        color: #808080;
                    }

                    .kind {
                        font-weight: bold;
                    }
                }
            }

            .price-quant {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 10px;

                .price-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    gap: 5px;

                    .original {
                        color: #800000;
                        text-decoration: line-through;
                    }

                    h6 {
                        font-size: 0.875rem;
                    }
                }

                .product-price {
                    color: #000;
                    white-space: pre-wrap;
                    font-size: 0.875rem;
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                }
            }
        }

    }
}

.fade-enter-active,
.fade-move {
    transition: 0.4s ease all;
}

.fade-leave-active {
    transition: 0.4s ease all;
    position: absolute;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.4);
}

.swap-enter-active,
.swap-leave-active {
    transition: 0.4s ease all;
}

.swap-enter-from,
.swap-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>