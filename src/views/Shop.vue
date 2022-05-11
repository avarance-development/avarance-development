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
                <label for="sorting" class="sort">Sort by:</label>
                <select id="sorting" class="selection">
                    <option value="">Featured</option>
                    <option value="popularity">Best Selling</option>
                    <option value="itemPrice">Item Price Ascending</option>
                    <option value="reverseditemPrice">Item Price Descending</option>
                    <option value="itemDiscount">Item Discount Ascending</option>
                    <option value="itemName">Alphabetically Ascending</option>
                    <option value="reverseditemName">Alphabetically Descending</option>
                    <option value="timeAdded">Recently Added</option>
                </select>
            </div>
            <div class="item-typing">
                <div class="title-wrapper">
                    <h1 class="title">Metal Material:</h1>
                    <RightArrow @click="toggleMetalFilter" class="icon" :class="{'icon-active' : metalFilter }"/>
                </div>
                <div v-show="metalFilter" class="type-wrapper">
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="any" value="" name="type" checked>
                        <label for="any" class="label">Any</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="steel" value="Stainless Steel" name="type">
                        <label for="steel" class="label">Stainless Steel</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="silver" value="Sterling Steel" name="type">
                        <label for="silver" class="label">Sterling Silver</label>
                    </div>
                </div>
            </div>
            <div class="available-menu">
                <div class="title-wrapper">
                    <h1 class="title">Stocked In Size:</h1>
                    <RightArrow @click="toggleSizeFilter" class="icon" :class="{'icon-active' : sizeFilter }"/>
                </div>
                <div v-show="sizeFilter" class="size-wrapper">
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="one" value="1"> -->
                        <input type="radio" id="n/a" value="" name="size" checked>
                        <label for="n/a">N/A</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="one" value="1"> -->
                        <input type="radio" id="one" value="1" name="size">
                        <label for="one">1</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="two" value="2"> -->
                        <input type="radio" id="two" value="2" name="size">
                        <label for="two">2</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="three" value="3"> -->
                        <input type="radio" id="three" value="3" name="size">
                        <label for="three">3</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="four" value="4"> -->
                        <input type="radio" id="four" value="4" name="size">
                        <label for="four">4</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="five" value="5"> -->
                        <input type="radio" id="five" value="5" name="size">
                        <label for="five">5</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="six" value="6"> -->
                        <input type="radio" id="six" value="6" name="size">
                        <label for="six">6</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="seven" value="7"> -->
                        <input type="radio" id="seven" value="7" name="size">
                        <label for="seven">7</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="eight" value="8"> -->
                        <input type="radio" id="eight" value="8" name="size">
                        <label for="eight">8</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="nine" value="9"> -->
                        <input type="radio" id="nine" value="9" name="size">
                        <label for="nine">9</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="ten" value="10"> -->
                        <input type="radio" id="ten" value="10" name="size">
                        <label for="ten">10</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="eleven" value="11"> -->
                        <input type="radio" id="eleven" value="11" name="size">
                        <label for="eleven">11</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="twelve" value="12"> -->
                        <input type="radio" id="twelve" value="12" name="size">
                        <label for="twelve">12</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="thirteen" value="13"> -->
                        <input type="radio" id="thirteen" value="13" name="size">
                        <label for="thirteen">13</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="fourteen" value="14"> -->
                        <input type="radio" id="fourteen" value="14" name="size">
                        <label for="fourteen">14</label>
                    </div>
                    <div class="wrapper">
                        <!-- <input type="checkbox" id="Fifteen" value="15"> -->
                        <input type="radio" id="Fifteen" value="15" name="size">
                        <label for="Fifteen">15</label>
                    </div>
                </div>
            </div>
            <div class="filter-menu">
                <div class="title-wrapper">
                    <h1 class="title">Filters:</h1>
                    <RightArrow @click="toggleFilterMenu" class="icon" :class="{'icon-active' : filterMenu }"/>
                </div>
                <div v-show="filterMenu" class="size-wrapper">
                    <label class="filter-title" for="ONE">Filter Major</label>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="ONE" value="" name="Filter Minor" checked>
                        <label for="ONE" class="label">Any</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="TWO" value="" name="Filter Minor">
                        <label for="TWO">Filter Minor</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="THREE" value="" name="Filter Minor">
                        <label for="THREE">Filter Minor</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="FOUR" value="" name="Filter Minor">
                        <label for="FOUR">Filter Minor</label>
                    </div>
                    <label class="filter-title" for="ONE">Filter Major2</label>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="1" value="" name="Filter Minor2" checked>
                        <label for="1" class="label">Any</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="2" value="" name="Filter Minor2">
                        <label for="2">Filter Minor2</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="3" value="" name="Filter Minor2">
                        <label for="3">Filter Minor2</label>
                    </div>
                    <label class="filter-title" for="ONE">Filter Major3</label>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="I" value="" name="Filter Minor3" checked>
                        <label for="I" class="label">Any</label>
                    </div>
                    <div class="minor-wrapper">
                        <input type="radio" class="" id="II" value="" name="Filter Minor3">
                        <label for="II">Filter Minor3</label>
                    </div>
                </div>
            </div>
            <div class="kind-menu">
                <label for="kind">One of a Kind?</label>
                <input type="checkbox" id="kind" value="true" name="kind">
            </div>
        </div>
        <ProductGrid :queryArray="queryArray" class="product-grid"/>
    </section>
  </div>
</template>

<script>
import ProductGrid from "../components/ProductGrid.vue"
import RightArrow from "../assets/Icons/rightarrow.svg"
import { getFirestore, where, collection, limit, getDocs, query } from "firebase/firestore"
import { firebaseApp } from "../firebase/firebaseInit.js"

export default {
    name: "Shop",
    data() {
        return {
            initialQueryList: [],
            queryArray: [],
            metalFilter: null,
            sizeFilter: null,
            filterMenu: null,
        }
    },
    components: {
        ProductGrid,
        RightArrow,
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
    methods: {
        async initialQuerry(route) {
            this.queryArray = []
            const db = getFirestore(firebaseApp);
            // const route = this.$route.params.category;
            console.log(route)

            if (route != "all") {
                this.initialQueryList[0] = { 
                    property: 'itemType', 
                    operator: '==', 
                    value: route,
                }

                const queryConditions = this.initialQueryList.map((condition) =>
                    where(condition.property, condition.operator, condition.value)
                );

                const queryToPreform = query(collection(db, 'products'), ...queryConditions, limit(24))
                const querySnapshot = await getDocs(queryToPreform);

                querySnapshot.forEach((doc) => {
                    this.queryArray.push(doc)
                });
            } else {
                const queryToPreform = query(collection(db, 'products'), limit(24))
                const querySnapshot = await getDocs(queryToPreform);
                
                querySnapshot.forEach((doc) => {
                    this.queryArray.push(doc)
                });
            }
        },
        toggleMetalFilter() {
            this.metalFilter = !this.metalFilter;
        },
        toggleSizeFilter() {
            this.sizeFilter = !this.sizeFilter;
        },
        toggleFilterMenu() {
            this.filterMenu = !this.filterMenu;
        }
    },
    async beforeMount() {
        console.log("route", this.$route)
        await this.initialQuerry(this.$route.params.category)
    },
    async beforeRouteUpdate(to, from, next) {
        console.log("to", to)
        console.log("from", from)
        // Going from Shop View to Shop view and it isn't from the same parameter (might not be a problem)
        if (to.name == from.name && to.params.category != from.params.category) {
            await this.initialQuerry(to.params.category)
        }
        next();
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
            gap: 30px;
            margin: 0 0px 10px 15px;
            min-width: 275px;
            position: relative;
            background-color: #ebebeb;
            box-shadow: 0.25px 0.25px 3.5px #ababab;

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
                    margin: 0 0 5px 22.5px;
                    font-weight: 500;
                    font-size: 1.5rem;
                }

                .selection {
                    width: 230px;
                    margin: 0 auto;
                    font-size: 1rem;
                }
            }

            .item-typing, .available-menu, .filter-menu {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .title-wrapper {
                    position: relative;

                    .title {
                        font-size: 1.5rem;
                        user-select: none;
                    }

                    .icon {
                        position: absolute;
                        top: 4px;
                        right: 5px;
                        transform: rotate(-90deg);
                        transition: transform 0.25s ease-in-out;
                    }

                    .icon-active {
                        transform: rotate(90deg);
                    }
                }

                .type-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;

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

                .size-wrapper {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(85px, 0.5fr));
                    justify-items: flex-start;
                    grid-auto-flow: row;
                    margin-left: 20px;
                    column-gap: 0px;
                    row-gap: 5px;

                    .wrapper {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;

                        label {
                            font-size: 1.25rem;
                        }
                    }
                }
            }

            .filter-menu {

                .size-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;

                    .minor-wrapper {
                        display: flex;
                        flex-direction: row;
                        gap: 10px;
                    }

                    .filter-title {
                        text-align: left;
                        font-weight: 600;
                        font-size: 1.125rem;
                        letter-spacing: 0.5px;
                        user-select: none;
                    }
                }
            }

            .kind-menu {
                display: flex;
                flex-direction: row;
                align-self: center;
                align-items: center;
                gap: 15px;
                margin-bottom: 30px;

                label {
                    user-select: none;
                    font-size: 1.5rem;
                }

                input {
                    width: 1.5rem;
                    height: 1.5rem;
                    border: 0.125rem solid #000;
                }

                input:before {
                    width: 1rem;
                    height: 1rem;
                }
            }
        
        }

        .product-grid {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
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

input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  color: #000;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #000;
  border-radius: 5%;
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.68em;
  height: 0.68em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: #800000;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

</style>