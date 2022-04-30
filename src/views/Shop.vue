<template>
  <div class="wrapper">
    <header class="header">
        <div class="routing">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <span class="arrow">-></span>
            <router-link class="link" :to="{ name: 'Shop', params: { category: `all` }}">All</router-link>
            <span class="arrow" v-if="currentCategory">-></span>
            <router-link class="link" v-if="this.$route.params.category" :to="{ name: 'Shop', params: { category: `${this.$route.params.category}` }}">{{  currentCategory  }}</router-link>
        </div>
        <h1 class='title' v-if="currentCategory">{{  currentCategory  }}</h1>
        <h1 class='title' v-else>Shop For All Our Items</h1>
        <h6 class='subtitle' v-if="currentCategory">Our Collection of Stainless Steel and Sterling Silver {{ currentCategory }}</h6>
        <h6 class='subtitle' v-else>Browse Our Collection in its entirety</h6>
    </header>
    <section class="container">
        <div class="aside">
            <div class="top-tab">
                <button class="cancel">Cancel</button>
                <h4 class="filters">Filters</h4>
                <button class="apply">Apply</button>
            </div>
            <div class="sort-by-tab">
                <label for="sorting" class="sort">Sort by</label>
                <select id="sorting" class="selection">
                    <option value="">Featured</option>
                    <option value="popularity">Best Selling</option>
                    <option value="itemPrice">Item Price Ascending</option>
                    <option value="reverseditemPrice">Item Price Descending</option>
                    <option value="itemDiscount">Item Discount Ascending</option>
                    <option value="reverseditemDiscount">Item Discount Descending</option>
                    <option value="itemName">Alphabetically Ascending</option>
                    <option value="reverseditemName">Alphabetically Descending</option>
                    <option value="timeAdded">Recently Added</option>
                </select>
            </div>
            <div class="item-typing">
                <h1 class="title">Metal Material</h1>
                <div class="type-wrapper">
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="steel" value="Stainless Steel" name="type" checked>
                        <label for="steel" class="label">Stainless Steel</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="silver" value="Sterling Steel" name="type">
                        <label for="silver" class="label">Sterling Silver</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid">
            <FadeSquare class='square' v-for="square in 24" :key="square" />
        </div>
    </section>
  </div>
</template>

<script>
import FadeSquare from "../components/FadeSquare.vue"

export default {
    name: "Shop",
    data() {
        return {
            initialQueryList: [ { property: 'where', operator: '==', value: this.$route.params.category } ],
        }
    },
    components: {
        FadeSquare,
    },
    computed: {
        currentCategory() {
            const query = this.$route.params.category
            if (query == "all") {
                return null
            } else {
                return query.substr(0,1).toUpperCase() + query.substring(1)
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.wrapper {

    .header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 100px 0 30px 0;

        .routing {
            display: flex;
            flex-direction: row;
            gap: 5px;

            .link {
                position: relative;
                text-decoration: none;
                color: #000;
                letter-spacing: 0.5px;
                
            }

            .link::before {
                content:'';
                position: absolute;
                bottom: -1.5px;
                left: 0;
                width: 0;
                height: 1.5px;
                background-color: black;
                transition: all 0.2s ease-in-out;
            }

            .link:hover::before {
                width: 100%;
            }

            .arrow {
                color: #606060;
            }
        }

        .title {
            font-size: 2rem;
            letter-spacing: 1px;
        }

        .subtitle {
            font-size: 0.75rem;
        }
    }

    .container {
        display: flex;
        flex-direction: row;
        
        .aside {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 0 10px 10px 10px;
            min-width: 250px;
            position: relative;
            background-color: #ebebeb;
            box-shadow: 0.5px 0.5px 2.5px #ababab;

            .top-tab {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 10px 10px 10px;

                .cancel {
                    color: #606060;
                    cursor: pointer;
                    border-top: none;
                    border-right: none;
                    border-left: none;
                    border-bottom: 2px solid #606060;
                    transition: color 0.3s ease-in;
                }

                .cancel:hover {
                    color: #303030;
                }

                .apply {
                    padding: 7.5px;
                    border-radius: 5px;
                    background-color: #303030;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
            }

            .sort-by-tab {
                display: flex;
                flex-direction: column;

                .sort {
                    width: fit-content;
                    margin: 0 0 5px 10px;
                    font-weight: 500;
                    font-size: 1.25rem;
                }

                .selection {
                    width: 230px;
                    margin: 0 auto;
                    font-size: 1rem;
                }
            }

            .item-typing {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .title {
                    font-size: 1.5rem;
                }

                .type-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    .wrapper {
                        position: relative;

                        label {
                            font-size: 1.25rem;
                            width: 26px;
                            height: 26px;
                        }

                        input {
                            position: absolute;
                            top: 4.5px;
                            left: 20px;
                            cursor: pointer;
                        }

                    }

                }
            }
        }
        .grid {
            flex-basis: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 10px;
            justify-items: center;
            margin-bottom: 30px;
            margin-right: 10px;
        }
    }
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  color: #000;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #000;
  border-radius: 50%;
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.68em;
  height: 0.68em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: #800000;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}


</style>