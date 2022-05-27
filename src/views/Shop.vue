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
                <button class="cancel" @click="cancelQuerry">Cancel</button>
                <h4 class="filters">Filters</h4>
                <button class="apply" @click="formQuerry">Apply</button>
            </div>
            <div class="sort-by-tab">
                <label for="sorting" class="sort">Sort by:</label>
                <select id="sorting" class="selection" v-model="sortedBy">
                    <option value="">Featured</option>
                    <option value="popularity">Best Selling</option>
                    <option value="itemPrice">Item Price Ascending</option>
                    <option value="itemDiscount desc">Item Discount Descending</option>
                    <option value="itemName">Alphabetically Ascending</option>
                    <option value="itemName desc">Alphabetically Descending</option>
                    <option value="timeAdded desc">Recently Added</option>
                </select>
            </div>
            <div class="item-typing">
                <div @click="toggleMetalFilter" class="title-wrapper">
                    <h1 class="title">Metal Material:</h1>
                    <RightArrow class="icon" :class="{'icon-active' : metalFilter }"/>
                </div>
                <div v-show="metalFilter" class="type-wrapper">
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="any" value="" name="type" v-model="metalMaterial" checked>
                        <label for="any" class="label">Any</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="steel" value="Stainless Steel" v-model="metalMaterial" name="type">
                        <label for="steel" class="label">Stainless Steel</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" class="type-input" id="silver" value="Sterling Silver" v-model="metalMaterial" name="type">
                        <label for="silver" class="label">Sterling Silver</label>
                    </div>
                </div>
            </div>
            <div class="available-menu">
                <div @click="toggleSizeFilter" class="title-wrapper">
                    <h1 class="title">Stocked In Size:</h1>
                    <RightArrow class="icon" :class="{'icon-active' : sizeFilter }"/>
                </div>
                <div v-show="sizeFilter" class="size-wrapper">
                    <div class="wrapper">
                        <input type="radio" id="n/a" value="" name="size" v-model="size" checked>
                        <label for="n/a">N/A</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="four" value="4" name="size" v-model="size">
                        <label for="four">4</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="five" value="5" name="size" v-model="size">
                        <label for="five">5</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="six" value="6" name="size" v-model="size">
                        <label for="six">6</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="seven" value="7" name="size" v-model="size">
                        <label for="seven">7</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="eight" value="8" name="size" v-model="size">
                        <label for="eight">8</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="nine" value="9" name="size" v-model="size">
                        <label for="nine">9</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="ten" value="10" name="size" v-model="size">
                        <label for="ten">10</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="eleven" value="11" name="size" v-model="size">
                        <label for="eleven">11</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="twelve" value="12" name="size" v-model="size">
                        <label for="twelve">12</label>
                    </div>
                    <div class="wrapper">
                        <input type="radio" id="thirteen" value="13" name="size" v-model="size">
                        <label for="thirteen">13</label>
                    </div>
                    <div class="wrapper half">
                        <input type="checkbox" id="Half" value="half" v-model="half">
                        <label for="Half">Half Size Up?</label>
                    </div>
                </div>
            </div>
            <div class="filter-menu">
                <div class="title-wrapper" @click="toggleFilterMenu">
                    <h1 class="title">Filters:</h1>
                    <RightArrow class="icon" :class="{'icon-active' : filterMenu }"/>
                </div>
                <div v-show="filterMenu" class="size-wrapper">
                    <label class="filter-title" for="ONE" @click="toggleFirstFilterMenu">
                        Filter Major
                        <RightArrow class="icon" :class="{'icon-active' : firstFilterMenu }"/>
                    </label>
                    <div v-show="firstFilterMenu" class="minor-wrapper">
                        <input type="radio" id="ONE" value="" name="Filter Minor" v-model="first" checked>
                        <label for="ONE" class="label">Any</label>
                    </div>
                    <div v-show="firstFilterMenu" class="minor-wrapper">
                        <input type="radio" id="TWO" value="Stock" name="Filter Minor" v-model="first">
                        <label for="TWO">Filter Minor</label>
                    </div>
                    <div v-show="firstFilterMenu" class="minor-wrapper">
                        <input type="radio" id="THREE" value="THREE" name="Filter Minor" v-model="first">
                        <label for="THREE">Filter Minor</label>
                    </div>
                    <div v-show="firstFilterMenu" class="minor-wrapper">
                        <input type="radio" id="FOUR" value="FOUR" name="Filter Minor" v-model="first">
                        <label for="FOUR">Filter Minor</label>
                    </div>
                    <label class="filter-title" for="1" @click="toggleSecondFilterMenu">
                        Filter Major2
                        <RightArrow class="icon" :class="{'icon-active' : secondFilterMenu }"/>
                    </label>
                    <div v-show="secondFilterMenu" class="minor-wrapper">
                        <input type="radio" id="1" value="" name="Filter Minor2" v-model="second" checked>
                        <label for="1" class="label">Any</label>
                    </div>
                    <div v-show="secondFilterMenu" class="minor-wrapper">
                        <input type="radio" id="2" value="Price" name="Filter Minor2" v-model="second">
                        <label for="2">Filter Minor2</label>
                    </div>
                    <div v-show="secondFilterMenu" class="minor-wrapper">
                        <input type="radio" id="3" value="3" name="Filter Minor2" v-model="second">
                        <label for="3">Filter Minor2</label>
                    </div>
                    <label class="filter-title" for="I" @click="toggleThirdFilterMenu">
                        Filter Major3
                        <RightArrow class="icon" :class="{'icon-active' : thirdFilterMenu }"/>
                    </label>
                    <div v-show="thirdFilterMenu" class="minor-wrapper">
                        <input type="radio" id="I" value="" name="Filter Minor3" v-model="third" checked>
                        <label for="I" class="label">Any</label>
                    </div>
                    <div v-show="thirdFilterMenu" class="minor-wrapper">
                        <input type="radio" id="II" value="Space" name="Filter Minor3" v-model="third">
                        <label for="II">Filter Minor3</label>
                    </div>
                </div>
            </div>
            <div class="kind-menu">
                <label for="kind">One of a Kind?</label>
                <input type="checkbox" id="kind" value="true" name="kind" v-model="oneOfAKind">
            </div>
            <div class="kind-menu">
                <label for="in-stocked">In Stock?</label>
                <input type="checkbox" id="in-stocked" value="true" name="in-stocked" v-model="inStock">
            </div>
        </div>
        <ProductGrid @shift-query="shiftQuery($event)" :currentPageNumber="currentPageNumber" :queryArray="queryArray" :loading="loading" class="product-grid"/>
    </section>
  </div>
</template>

<script>
import ProductGrid from "../components/ProductGrid.vue"
import RightArrow from "../assets/Icons/rightarrow.svg"
import { where, collection, limit, getDocs, query, orderBy, startAfter, endBefore } from "firebase/firestore"
import { db } from "../firebase/firebaseInit.js"

export default {
    name: "Shop",
    data() {
        return {
            initialQueryList: [],
            queryArray: [],
            metalFilter: null,
            sizeFilter: null,
            filterMenu: null,
            sortedBy: "",
            metalMaterial: "",
            size: "",
            half: null,
            oneOfAKind: false,
            filters: [],
            first: "",
            second: "",
            third: "",
            firstFilterMenu: false,
            secondFilterMenu: false,
            thirdFilterMenu: false,
            inStock: false,
            loading: true,
            oldQuerry: {
                "filters" : [],
                "route" : this.$route.params.category,
                "metalMaterial": "",
                "fullSize" : "",
                "inStock" : false,
                "oneOfAKind" : false,
                "sortedBy" : ""
            },
            limit: this.$store.state.limit,
            currentPageNumber: 0,
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
            this.loading = true;
            this.initialQueryList = []
            if (route != "all") {
                this.initialQueryList[0] = { 
                    property: 'itemType', 
                    operator: '==', 
                    value: route,
                }

                const queryConditions = this.initialQueryList.map((condition) =>
                    where(condition.property, condition.operator, condition.value)
                );

                const queryToPreform = query(collection(db, 'products'), ...queryConditions, limit(this.limit))
                const querySnapshot = await getDocs(queryToPreform);
                this.queryArray = []
                querySnapshot.forEach((doc) => {
                    this.queryArray.push(doc)
                });
            } else {
                const queryToPreform = query(collection(db, 'products'), limit(this.limit))
                const querySnapshot = await getDocs(queryToPreform);
                this.queryArray = []
                querySnapshot.forEach((doc) => {
                    this.queryArray.push(doc)
                });
            }
            this.loading = false;
        },
        async formQuerry() {
            this.loading = true;
            this.filters = []
            if (this.first) {
                this.filters.push(this.first)
            }
            if (this.second) {
                this.filters.push(this.second)
            }
            if (this.third) {
                this.filters.push(this.third)
            }
            
            this.initialQueryList = []
            const route = this.$route.params.category;
            if (route != "all") {
                this.initialQueryList.push({ 
                    property: 'itemType', 
                    operator: '==', 
                    value: route,
                })
            }
            if (this.metalMaterial) {
                this.initialQueryList.push({
                    property: 'metalMaterial',
                    operator: '==',
                    value: this.metalMaterial,
                })
            }
            if (this.size) {
                let sizeQuerry = "sizesBool." + this.size
                if (this.half) {
                    sizeQuerry = sizeQuerry += "5"
                }
                this.initialQueryList.push({
                    property: sizeQuerry,
                    operator: '==',
                    value: true
                })
            } else if (this.inStock) {
                this.initialQueryList.push({
                    property: 'itemInStock',
                    operator: '==',
                    value: true,
                })
            }
            if (this.oneOfAKind) {
                this.initialQueryList.push({
                    property: 'oneOfAKind',
                    operator: '==',
                    value: true,
                })
            }
            if (this.filters.length > 0) {
                this.initialQueryList.push({
                    property: 'filters',
                    operator: 'array-contains-any',
                    value: this.filters,
                })
            }

            const queryConditions = this.initialQueryList.map((condition) =>
                where(condition.property, condition.operator, condition.value)
            );

            let queryToPreform;
            if (this.sortedBy) {
                if (this.sortedBy.includes("desc")) {
                    let directQ = this.sortedBy.substring(0, this.sortedBy.length - 5)
                    queryToPreform = query(collection(db, 'products'), ...queryConditions, orderBy(directQ, "desc"), limit(this.limit))
                } else {
                    queryToPreform = query(collection(db, 'products'), ...queryConditions, orderBy(this.sortedBy),  limit(this.limit))
                }
            } else {
                queryToPreform = query(collection(db, 'products'), ...queryConditions, limit(this.limit))
            }

            const fullSize = this.half ? this.size + "5" : this.size;
            const newQuerry =  {
                "filters" : this.filters,
                "route" : route,
                "metalMaterial": this.metalMaterial,
                "fullSize" : fullSize,
                "inStock" : this.inStock,
                "oneOfAKind" : this.oneOfAKind,
                "sortedBy" : this.sortedBy,
            };

            if (JSON.stringify(this.oldQuerry) === JSON.stringify(newQuerry)) {
                console.log("SAME QUERRY")
                this.loading = false;
                return;
            }
            this.oldQuerry = newQuerry;
            const querySnapshot = await getDocs(queryToPreform);
            // attempt to reinstantiate the array with documents one at a time
            this.queryArray = []
            querySnapshot.forEach((doc) => {
                this.queryArray.push(doc)
            });

            this.loading = false;
        },
        async shiftQuery(direction) {
            this.loading = true;
            this.filters = []
            const colRef = collection(db, 'products');
            const lastQuery = this.queryArray[this.queryArray.length - 1];
            const firstQuery = this.queryArray[0]

            if (this.currentPageNumber == 0 && direction == -1) {
                return;
            } else if (direction == 1 && this.queryArray.length < this.limit) {
                return;
            }
            this.currentPageNumber += direction;
            
            let queryToPreform;
            if (this.sortedBy) {
                if (this.sortedBy.includes("desc")) {
                    let directQ = this.sortedBy.substring(0, this.sortedBy.length - 5)
                    if (direction == 1) {
                        queryToPreform = query(colRef, orderBy(directQ, "desc"), startAfter(lastQuery), limit(this.limit))
                    } else {
                        queryToPreform = query(colRef, orderBy(directQ, "desc"), endBefore(firstQuery), limit(this.limit))
                    }
                } else {
                    if (direction == 1) {
                        queryToPreform = query(colRef, orderBy(this.sortedBy), startAfter(lastQuery), limit(this.limit))
                    } else {
                        queryToPreform = query(colRef, orderBy(this.sortedBy), endBefore(firstQuery), limit(this.limit))
                    }
                }
            } else {
                if (direction == 1) {
                    queryToPreform = query(collection(db, 'products'), startAfter(lastQuery), limit(this.limit))
                } else {
                    queryToPreform = query(collection(db, 'products'), endBefore(firstQuery), limit(this.limit))
                }
            }

            const querySnapshot = await getDocs(queryToPreform).then((result) => {
                if (window.innerWidth > 800) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                }
                return result;
            });
            // attempt to reinstantiate the array with documents one at a time
            this.queryArray = []
            querySnapshot.forEach((doc) => {
                this.queryArray.push(doc)
            });

            this.loading = false;
        },
        toggleMetalFilter() {
            this.metalFilter = !this.metalFilter;
        },
        toggleSizeFilter() {
            this.sizeFilter = !this.sizeFilter;
        },
        toggleFilterMenu() {
            this.filterMenu = !this.filterMenu;
        },
        toggleFirstFilterMenu() {
            this.firstFilterMenu = !this.firstFilterMenu;
        },
        toggleSecondFilterMenu() {
            this.secondFilterMenu = !this.secondFilterMenu;
        },
        toggleThirdFilterMenu() {
            this.thirdFilterMenu = !this.thirdFilterMenu;
        },
        cancelQuerry() {
            this.metalFilter = false;
            this.sizeFilter = false;
            this.filterMenu = false;
            this.sortedBy = "";
            this.metalMaterial = "";
            this.size = "";
            this.half = false;
            this.oneOfAKind = false;
            this.inStock = false;
            this.firstFilterMenu = false;
            this.secondFilterMenu = false;
            this.thirdFilterMenu = false;
            this.first = "";
            this.second = "";
            this.third = "";
        }
    },
    async beforeMount() {
        await this.initialQuerry(this.$route.params.category)
    },
    async beforeRouteUpdate(to, from, next) {
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
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
            justify-content: center;

            .link {
                position: relative;
                text-decoration: none;
                color: #000;
                letter-spacing: 0.5px;
                white-space: nowrap;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

                @media (max-width: 500px) {
                    font-size: 0.75rem;
                }
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
                white-space: nowrap;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                
                @media (max-width: 500px) {
                    font-size: 0.75rem;
                }
            }
        }

        .title {
            font-size: 2rem;
            letter-spacing: 1px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            @media (max-width: 500px) {
                font-size: 1.5rem;
            }
        }

        .subtitle {
            font-size: 0.75rem;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            @media (max-width: 500px) {
                font-size: 0.67rem;
            }
        }
    }

    .container {
        display: flex;
        flex-direction: row;

        @media(max-width: 800px) {
            flex-direction: column;
        }

        .aside {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin: 0 0px 10px 15px;
            min-width: 275px;
            position: sticky;
            top: 80px;
            background-color: #ebebeb;
            box-shadow: 0.25px 0.25px 3.5px #ababab;
            height: min-content;
            min-height: 500px;


            @media(max-width: 800px) {
                position: relative;
                top: unset;
                gap: 15px;
                min-width: unset;
                min-height: unset;
                margin: 0 20px 10px 20px;
            }

            .top-tab {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 10px 10px 10px 10px;

                @media(max-width: 800px) {
                    padding: 10px 10px 0 10px;
                }

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

                @media(max-width: 800px) {
                    align-content: center;
                }

                .sort {
                    width: fit-content;
                    margin: 0 0 5px 22.5px;
                    font-weight: 500;
                    font-size: 1.5rem;

                    @media(max-width: 800px) {
                        width: unset;
                        margin: 0 0 10px 0;
                    }
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
                        position: relative;
                    }

                    .title::before {
                        content: "";
                        position: absolute;
                        bottom: -0.1rem;
                        left: 15px;
                        width: 255px;
                        height: 0.1rem;
                        background-color: #000;

                        @media(max-width: 800px) {
                            max-width: 100%;
                            left: 50%;
                            transform: translate(-50%);
                        }
                    }

                    @media(max-width: 800px) {
                        left: 50%;
                        transform: translateX(-50%);
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

                    .wrapper:last-child {
                        grid-column: 2;
                        min-width: 230px;
                        grid-row: 4;
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
                            user-select: none;
                        }
                    }

                    .half {
                        min-width: 230px;
                        grid-column: 1;

                        @media(max-width: 800px) {
                            min-width: calc(100vw - 95px);
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
                        position: relative;
                        text-align: left;
                        font-weight: 600;
                        font-size: 1.125rem;
                        letter-spacing: 0.5px;
                        user-select: none;

                        .icon {
                            position: absolute;
                            top: 0;
                            right: 0;
                            transition: transform 0.25s ease-in-out;
                        }

                        .icon-active {
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            .kind-menu {
                display: flex;
                flex-direction: row;
                align-self: center;
                align-items: center;
                gap: 15px;

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

            .kind-menu:last-child {
                margin-bottom: 20px;
            }
        
        }

        .product-grid {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            min-height: 800px;
            justify-content: space-between;
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