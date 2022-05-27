<template>
  <div class="container">
    <Loading v-show="loading"/>
    <header class="header">
      <div class="routing">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <span class="arrow">-></span>
        <router-link class="link" :to="{ name: 'Shop', params: { category: `all` }}">All</router-link>
        <span class="arrow" v-if="currentCategory">-></span>
        <router-link class="link" v-if="this.$route.params.category" :to="{ name: 'Shop', params: { category: `${this.$route.params.category}` }}">{{  currentCategory  }}</router-link>
        <span class="arrow" v-if="currentCategory">-></span>
        <router-link class="link" :to="{ name: 'ViewProduct', params: { category: category, productId: productId }}">{{ this.title }}</router-link>
      </div>
      <h1 class='title' v-if="currentCategory">{{  currentCategory  }}</h1>
      <h1 class='title' v-else>Shop For All Our Items</h1>
      <h6 class='subtitle' v-if="currentCategory">Our Collection of Stainless Steel and Sterling Silver {{ currentCategory }}</h6>
      <h6 class='subtitle' v-else>Browse Our Collection in its entirety</h6>
    </header>
    <div class="item-partition">
      <div class="image-container">
        <div class="slider-container">
          <div class="top-carousel-wrapper">
            <button class="handle left" @click="nextPicture(-1)"></button>
            <div class="slider">
              <img :class="{ active: index == activeIndex }" v-for="(pic, index) in picArray" :key="index" :src="pic">
            </div>
            <button class="handle right" @click="nextPicture(1)"></button>
          </div>
          <div class="bottom-slidder-wrapper">
            <button class="handle left" @click="sliderShift(-1)"></button>
            <img class="slider-image" :style="{ '--slider-index' : sliderIndex}" @click="setActivePicture(index)" :class="{ active: index == activeIndex }" v-for="(pic, index) in picArray" :key="index" :src="pic">
            <button class="handle right" @click="sliderShift(1)"></button>
          </div>
        </div>
      </div>
      <div class="item-info-container">
        <h1 class="info-title">{{ title }}</h1>
        <p class="info-metal">{{ metal }}</p>
        <h3 class="info-price">Price for All Sizes: ${{ price.toFixed(2) }}</h3>
        <p class="info">Part of our {{ currentCategory.substr(0, currentCategory.length - 1) }} Collection, made out of {{ metal }}, 
          this {{ this.$route.params.category.substr(0, this.$route.params.category.length - 1) }}
          serves as a great gift or a nice jewelry piece.
        </p>
        <p class="select-size">Selected {{ currentCategory.substr(0, currentCategory.length - 1)}} Size: {{ selectedSize }}</p>
        <div class="sizes-grid">
          <div class="size" v-for="(value, item, index) in range(20, 4)" :key="index">
            <input :disabled="!sizeMapBool[Number(value.toString().replace('.', ''))]" @click="resetQuantity" class="radio" type="radio" v-model.number="selectedSize" :value="value" name="sizes">
            <span class="label">{{value}}</span>
            <img v-if="!sizeMapBool[Number(value.toString().replace('.', ''))]" class="crossed-out" src="@/assets/cross.jpg">
          </div>
        </div>
        <label for="quantity">Quantity:</label>
        <div class="quantity-slider">
          <button @click="adjustQuantity(-1)">-</button>
          <input v-model.number.lazy="quantity" type="number" id="quantity" min="0">
          <button @click="adjustQuantity(1)">+</button>
        </div>
        <p v-show="addedToCart" class="addToCart">{{ addedToCart }}</p>
        <div class="button-container">
          <button class="add-to-cart" @click="addToCart">
            Add to Cart
          </button>
          <button class="checkout">
            Checkout
          </button>
        </div>
        <h1 class="shipping-title">
          Shipping and Return Information
        </h1>
        <p class="shipping-description">
          This is sample text talking about shipping returns and describing.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseInit.js"
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading.vue"

export default {
  name: "ViewProduct",
  data() {
      return {
        title: "",
        picArray: [],
        loading: false,
        activeIndex: 0,
        price: null,
        metal: null,
        selectedSize: null,
        sizeMapBool: {},
        itemSizes: {},
        sliderIndex: 0,
        quantity: 0,
        addedToCart: "",
      }
  },
  props: ["item", "category", "productId"],
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
  components: {
    Loading,
  },
  async created() {
    this.loading = true;
    if (this.$props.item != null) {
      this.title = this.$props.item.itemName;
      this.picArray = this.$props.item.itemPictures;
      this.sizeMapBool = this.$props.item.sizesBool;
      this.itemSizes = this.$props.item.itemSizes;
      this.price = this.$props.item.itemPrice;
      this.metal = this.$props.item.metalMaterial;
      this.$store.commit("setCurrentItem", this.$props.item)
      console.log("through prop")
    } else if (this.$store.state.currentItem != null && this.$store.state.currentItem.itemID == this.$props.productId) {
      this.title = this.$store.state.currentItem.itemName;
      this.picArray = this.$store.state.currentItem.itemPictures;
      this.sizeMapBool = this.$store.state.currentItem.sizesBool;
      this.itemSizes = this.$store.state.currentItem.itemSizes;
      this.price = this.$store.state.currentItem.itemPrice;
      this.metal = this.$store.state.currentItem.metalMaterial;
      console.log("through the state")
    } else {
      const docRef = doc(db, 'products', this.$props.productId);
      const currentDoc = await getDoc(docRef);
      this.$store.commit("setCurrentItem", currentDoc.data())
      this.title = this.$store.state.currentItem.itemName;
      this.picArray = this.$store.state.currentItem.itemPictures;
      this.sizeMapBool = this.$store.state.currentItem.sizesBool;
      this.itemSizes = this.$store.state.currentItem.itemSizes;
      this.price = this.$store.state.currentItem.itemPrice;
      this.metal = this.$store.state.currentItem.metalMaterial;
      console.log("through firebase")
    }
    this.loading = false;
  },
  methods: {
    nextPicture(direction) {
      const newVal = (this.activeIndex + direction)
      this.activeIndex = this.modMath(newVal, this.picArray.length);
    },
    setActivePicture(index) {
      this.activeIndex = index
    },
    resetQuantity() {
      this.quantity = 0;
    },
    adjustQuantity(direction) {
      if (this.selectedSize == null) {
        return;
      }

      const mappedSize = this.itemSizes[Number(this.selectedSize.toString().replace('.', ''))]

      if (direction == 1) {
        this.quantity = Math.min(this.quantity + 1, mappedSize)
      } else {
        this.quantity = Math.max(this.quantity - 1, 0)
      }
    },
    sliderShift(direction) {
      const sliders = document.getElementsByClassName("slider-image")
      const sliderIndex = parseInt(getComputedStyle(sliders[0]).getPropertyValue("--slider-index"));
      const itemsPerScreen = parseInt(getComputedStyle(sliders[0]).getPropertyValue("--items-per-screen"));
      if (itemsPerScreen >= this.picArray.length) {
        return;
      }
      let itemsLeft;
      if (direction == 1) {
        itemsLeft = this.picArray.length - ((sliderIndex + itemsPerScreen) * direction)
      } else {
        itemsLeft = sliderIndex
      }
      const movement = Math.min(itemsLeft, itemsPerScreen - 1)
      for (let i = 0; i < sliders.length; i++) {
        // let slider = sliders[i]
        const modular = this.modMath(sliderIndex + (direction * movement), this.picArray.length)
        if (direction == -1) {
          modular = Math.min(modular, this.picArray.length - itemsPerScreen)
        }
        if (modular == sliderIndex && direction == 1) {
          this.sliderIndex = 0;
          // slider.style.setProperty("--slider-index", 0);
        } else if (modular == sliderIndex && direction == -1) {
          this.sliderIndex = this.picArray.length - itemsPerScreen;
          // slider.style.setProperty("--slider-index", this.picArray.length - itemsPerScreen);
        } else {
          this.sliderIndex = modular;
          // slider.style.setProperty("--slider-index", modular);
        }
      }
    },
    async addToCart() {
      console.log("adding to cart");
      if (this.quantity <= 0) {
        return;
      }
      if (this.selectedSize == null) {
        return;
      }
      const item = this.$store.state.currentItem;
      const mappedSize = item.itemSizes[Number(this.selectedSize.toString().replace('.', ''))]
      const newID = item.itemID.concat(this.selectedSize.toString());
      this.$store.commit("addItemToCart", {
        itemID: item.itemID,
        itemName: item.itemName,
        itemMetalMaterial: item.metalMaterial,
        itemPrice: item.itemPrice,
        itemDiscount: item.itemDiscount,
        itemOriginalPrice: item.itemOriginalPrice,
        itemPicture: item.itemPictures[0],
        itemSize: this.selectedSize,
        itemQuantity: this.quantity,
        maxQuantity: mappedSize,
        oneOfAKind: item.oneOfAKind,
        category: this.$route.params.category,
        uniqueID: newID,
      });
      this.addedToCart = this.$store.state.message
      console.log(this.$store.state.cart)
      console.log(this.addedToCart)
      await setTimeout(() => {
        this.addedToCart = "";
      }, 5000)
    },
    modMath(n, m) {
      return ((n % m) + m) % m;
    },
    range(size, startAt = 0) {
      return [...Array(size).keys()].map(i => i/2 + startAt);
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.container {
  min-height: fit-content;
  width: 100%;

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
              
        @media (max-width: 500px) {
          font-size: 0.75rem;
        }
      }
    }

    .title {
      font-size: 2rem;
      letter-spacing: 1px;
      @media (max-width: 500px) {
        font-size: 1.75rem;
      }
    }

    .subtitle {
      font-size: 0.75rem;
    }
  }

  .item-partition {
    display: flex;
    margin: 0 10%;
    width: 75%;
    height: fit-content;
    gap: 5%;

    @media(max-width: 650px) {
      flex-direction: column;
      width: 87.5%;
      margin: 0 5%;
      gap: 2.5%;
    }

    .image-container {
      flex-basis: 50%;

      .slider-container {
        position: sticky;
        top: 75px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .top-carousel-wrapper {
          position: relative;
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          
          .slider {
            position: relative;
            width: 100%;
            height: 100%;

            img {
              position: absolute;
              inset: 0;
              width: 100%;
              height: auto;
              object-fit: cover;
              aspect-ratio: 1 / 1;
              opacity: 0;
              transition: opacity 0.15s ease;
            }

            .active {
              opacity: 1;
            }
          }
        }

        
        .bottom-slidder-wrapper:hover,
        .bottom-slidder-wrapper:active,
        .top-carousel-wrapper:hover,
        .top-carousel-wrapper:active {
          
          .handle::before {
            background-color: rgba(0,0,0,0.30);
            color:#000;
          }
        }

        .bottom-slidder-wrapper {
          position: relative;
          display: flex;
          flex-direction: row;
          gap: 5px;
          width: 100%;
          overflow: hidden;
          margin-bottom: 25px;

          .slider-image {
            --items-per-screen: 4;
            --slider-index: 0;
            flex: 0 0 calc((100% / var(--items-per-screen)) - 5px);
            max-width: calc((100% / var(--items-per-screen)) - 5px);
            aspect-ratio: 1 / 1;
            transform: translateX(calc(var(--slider-index) * (-100% - 5px)));
            transition: transform 250ms ease-in-out;
            
            @media (max-width: 1100px) {
              --items-per-screen: 3;
            }

          }

          .active {
            border: 1px solid black;
          }

          .handle {
            height: 3rem;
            padding: 0;
            margin: 0;
            color: transparent;
            border-radius: 0;
          }
        }
      }
    }
    .item-info-container {
      flex-basis: 50%;

      .info-title {
        position: relative;
      }
      
      .info-metal {
        color: #888888;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 3px solid black;
      }

      .info-price {
        position: relative;
        margin-bottom: 25px;
      }

      .info {
        position: relative;
        margin: 30px 0;
      }

      .info::before,
      .info::after {
        display: block;
        content: "";
        width: 100%;
        left: 0;
        position: absolute;
        border-bottom: black solid 3px;
        cursor: default;
      }

      .info::before {
        top: -20px;
      }

      .info::after {
        bottom: -20px;
      }

      .select-size {
        position: relative;
        margin-bottom: 25px;
      }

      .sizes-grid {
        display: grid;
        flex-direction: row;
        grid-template-columns: repeat(auto-fit, minmax(45px, 0.5fr));
        grid-auto-flow: row;
        justify-items: center;
        gap: 10px;
        position: relative;
        margin-bottom: 10px;
        padding-bottom: 15px;
        border-bottom: 3px solid black;

        .size {
          position: relative;
          width: fit-content;
          height: fit-content;

          .crossed-out {
            position: absolute;
            top: 50%;  
            left: 50%;
            transform: translate(-50%, -50%);
            width: 87.5%;
            height: 87.5%;
            user-select: none;
            opacity: 0.5;
          }

          .label {
            position: absolute;
            top: 50%;  
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: calc(100% / 1.25);
            user-select: none;
            pointer-events: none;
            }
        }
      }

      .quantity-slider {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
        padding: 10px 0 15px 0;

        button {
          height: 1.5rem;
          width: 1.5rem;
          background-color: #fff;
          border-radius: 15%;
          border: 1.5px solid black;
          cursor: pointer;
        }

        input {
          width: 9rem;
          border: 1.5px solid black;
          pointer-events: none;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
  
        input[type=number] {
          -moz-appearance: textfield;
        }
      }

      .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 10px 0 15px 0;
        gap: 5px;
        padding-top: 15px;
        border-top: 3px solid black;

        button {
          width: 35%;
          height: 45px;
          color: #fff;          
          cursor: pointer;
        }

        .add-to-cart {
          background-color: #800000;
        }

        .checkout {
          background-color: #111111;
        }
      }

      .addToCart {
        position: relative;
      }

      .shipping-title {
        display: inline-block;
        position: relative;
        font-size: 1rem;
        margin-bottom: 10px;
        padding: 0 25px 10px 25px;
        border-bottom: 3px solid black;
      }

      .shipping-description {
        margin-bottom: 25px;
      }
    }
  }
}


.handle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: rgba(0,0,0,0.0);
  z-index: 10;
  padding: 0 0.25rem;
  height: 5rem;
  width: 2rem;
  color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: background-color 0.15s ease-in-out, color 0.15s ease, color 0.15s ease-in-out;
  border-radius: 0.75rem;
}

.handle:hover,
.handle:active {
  background-color: rgba(0,0,0,0.30);
  color:#000;
}

.handle:hover::before,
.handle:active::before {
  transform: scale(1.2);
}

.left {
  left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.left::before {
  position: absolute;
  content: "\2039";
  font-size: 2.5rem;
  line-height: 0;
  transition: all 0.15s ease-in-out;
}

.right {
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.right::before {
  content: "\203A";
  position: absolute;
  font-size: 2.5rem;
  line-height: 0;
  transition: all 0.15s ease-in-out;
}

input[type="radio"] {
  --dimension: 2.15rem;
  --border-depth: 0.15rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  color: #000;
  width: var(--dimension);
  height: var(--dimension);
  border: var(--border-depth) solid #000;
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  box-sizing: content-box;
  width: calc(var(--dimension) - var(--border-depth) * 2);
  height: calc(var(--dimension) - var(--border-depth) * 2);
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.35);
  transition: opacity 0.25s ease;
}

input[type="radio"]:checked::before {
  opacity: 1;
}
</style>