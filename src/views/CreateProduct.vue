<template>
  <div class="form-outline">
    <Loading v-show="loading"/>
    <form @submit.prevent="createProduct" class="form-wrapper">
      <h1 class='title'>Create a New Product</h1>
      <div class="input-wrapper">
        <label for="itemName">Item Name: </label>
        <input placeholder="Item Name" v-model="itemName" class='input' type="text" id="itemName" required="required" autocomplete="off">
      </div>
      <div class="input-wrapper">
        <label for="itemPrice">Item Price: </label>
        <input placeholder="Item Price" v-model.number.lazy="itemPrice" class='input' type="number" id="itemPrice" required="required" min="0" step="0.01">
      </div>
      <div class="input-wrapper">
        <label for="itemDiscount">Item Discount: </label>
        <input placeholder="Item Discount" v-model.number.lazy="itemDiscount" class='input range' type="range" id="itemDiscount" required="required" min="0" max="0.5" step="0.01">
        <p class="discount">{{  itemDiscount  }}</p>
      </div>
      <div class="input-wrapper">
        <label for="Item Type">Item Type: </label>
        <select v-model="itemType" id="Item Type">
          <option value="rings">Rings</option>
          <option value="pendants">Pendants</option>
          <option value="earrings">Earrings</option>
        </select>
      </div>
      <div class="input-wrapper">
        <label for="Metal Material">Metal Material: </label>
        <select v-model="metalMaterial" id="Metal Material">
          <option value="Stainless Steel">Stainless Steel</option>
          <option value="Sterling Silver">Sterling Silver</option>
        </select>
      </div>
      <div class="input-wrapper">
        <label for="filters">Filters: </label>
        <input placeholder="Filters" v-model="filterCandidate" class='input' type="text" id="filters" autocomplete="off">
        <button class='btn' @click.prevent="addCandidate">Add Filter</button>
        <div class="filter-wrapper">
          <p v-for="(item, index) in filters" :key="index">{{  item  }} <Cross class="icon" @click.prevent="deleteCandidate(index)"/></p>
        </div>
      </div>
      <div class="input-wrapper">
        <label for="cover">Cover Image: </label>
        <input placeholder="Cover Images" class='input' type="file" id="cover" @change="coverChange" required="required" accept="jpeg,jpg">
        <div class="image-wrapper">
          <img v-show="coverPicture" :src="coverPicture">
        </div>
      </div>
      <div class="input-wrapper">
        <label for="hover">Hover Image: </label>
        <input placeholder="Hover Images" class='input' type="file" id="hover" @change="hoverChange" required="required" accept="jpeg,jpg">
        <div class="image-wrapper">
          <img v-show="hoverPicture" :src="hoverPicture">
        </div>
      </div>
      <div class="input-wrapper">
        <label for="images">Product Images: </label>
        <input placeholder="Product Images" class='input' type="file" id="images" @change="onFileChange" multiple accept="jpeg,jpg">
        <div class="image-wrapper">
          <img v-for="(item, index) in itemPictures" :key="index" :src="itemPictures[index]">
        </div>
      </div>
      <div class="input-wrapper">
        <label for="oneOfAKind">One of a Kind?</label>
        <input v-model="oneOfAKind" class='input one' type="checkbox" id="oneOfAKind">
      </div>
      <div class="quantity" v-for="(value, item, index) in range(20, 4)" :key="index">
        <label for="quantity" :class="value % 1 == 0 ? '' : 'is-half-margin'">{{ value}}: </label>
        <input type='number' :class="value % 1 == 0 ? '' : 'is-half-width'" min="0" value="0" v-model.number="itemSizeArray[item]" id="quantity">
      </div>
      <p class='error' v-show="error">{{ error }}</p>
      <button class='btn submit' type="submit" style="margin-top: 10px">Create a New Product</button>
    </form>
  </div>
</template>

<script>
import Cross from "../assets/Icons/cross.svg"
import Loading from "../components/Loading.vue"
import { compress, filetoDataURL } from 'image-conversion';
import { collection, setDoc, doc } from "firebase/firestore"; 
import { db, timestamp } from "../firebase/firebaseInit.js"

export default {
  name: "CreateProduct",
  data() {
    return {
      itemName: "",
      itemPrice: 0.00,
      itemDiscount: 0.00,
      itemType: "rings",
      metalMaterial: "Stainless Steel",
      filterCandidate: "",
      filters: [],
      coverPicture: "",
      hoverPicture: "",
      itemPictures: [],
      oneOfAKind: false,
      popularity: 0,
      itemTotalQuantity: 0,
      itemSizeArray: new Array(20).fill(0),
      error: "",
      loading: false,
    }
  },
  components: {
    Cross,
    Loading,
  },
  methods: {
    addCandidate() {
      if (this.filterCandidate) {
        this.filterCandidate = this.filterCandidate.substr(0,1).toUpperCase() + this.filterCandidate.substring(1).toLowerCase()
        this.filters.push(this.filterCandidate);
        this.filterCandidate = "";
      }
    },
    deleteCandidate(index) {
      this.filters.splice(index, 1);
    },
    async onFileChange(e) {
      if (e.target.files.length == 0) {
        this.itemPictures = []
      }
      else {
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i]
          const res = await compress(file, 0.7)
          const url = await filetoDataURL(res)
          this.itemPictures[i] = url
        }
      }
    },
    async coverChange(e) {
      const file = e.target.files[0]
      const res = await compress(file, 0.7)
      const url = await filetoDataURL(res)
      this.coverPicture = url
    },
    async hoverChange(e) {
      const file = e.target.files[0]
      const res = await compress(file, 0.7)
      const url = await filetoDataURL(res)
      this.hoverPicture = url
    },
    async createProduct() {
      this.loading = true
      const total = this.itemSizeArray.reduce((partialSum, next) => partialSum + next, 0)
      const pics = [this.coverPicture, this.hoverPicture]
      const picArr = pics.concat(this.itemPictures)
      const newProductRef = collection(db, "products")
      const productID  = doc(newProductRef).id
      await setDoc(doc(db, "products", productID), {
        itemID: productID,
        itemName: this.itemName,
        itemType: this.itemType,
        itemPrice: Math.round((this.itemPrice - (this.itemDiscount * this.itemPrice) + Number.EPSILON) * 100) / 100,
        itemOriginalPrice: this.itemPrice,
        itemDiscount: this.itemDiscount,
        metalMaterial: this.metalMaterial,
        filters: this.filters,
        itemTotalQuantity: total,
        itemInStock: total != 0 ? true : false,
        itemSizes: {
          4: this.itemSizeArray[0],
          45: this.itemSizeArray[1],
          5: this.itemSizeArray[2],
          55: this.itemSizeArray[3],
          6: this.itemSizeArray[4],
          65: this.itemSizeArray[5],
          7: this.itemSizeArray[6],
          75: this.itemSizeArray[7],
          8: this.itemSizeArray[8],
          85: this.itemSizeArray[9],
          9: this.itemSizeArray[10],
          95: this.itemSizeArray[11],
          10: this.itemSizeArray[12],
          105: this.itemSizeArray[13],
          11: this.itemSizeArray[14],
          115: this.itemSizeArray[15],
          12: this.itemSizeArray[16],
          125: this.itemSizeArray[17],
          13: this.itemSizeArray[18],
          135: this.itemSizeArray[19],
        },
        sizesBool: {
          4: this.itemSizeArray[0] != 0 ? true : false,
          4_5: this.itemSizeArray[1] != 0 ? true : false,
          5: this.itemSizeArray[2] != 0 ? true : false,
          5_5: this.itemSizeArray[3] != 0 ? true : false,
          6: this.itemSizeArray[4] != 0 ? true : false,
          6_5: this.itemSizeArray[5] != 0 ? true : false,
          7: this.itemSizeArray[6] != 0 ? true : false,
          7_5: this.itemSizeArray[7] != 0 ? true : false,
          8: this.itemSizeArray[8] != 0 ? true : false,
          8_5: this.itemSizeArray[9] != 0 ? true : false,
          9: this.itemSizeArray[10] != 0 ? true : false,
          9_5: this.itemSizeArray[11] != 0 ? true : false,
          10: this.itemSizeArray[12] != 0 ? true : false,
          10_5: this.itemSizeArray[13] != 0 ? true : false,
          11: this.itemSizeArray[14] != 0 ? true : false,
          11_5: this.itemSizeArray[15] != 0 ? true : false,
          12: this.itemSizeArray[16] != 0 ? true : false,
          12_5: this.itemSizeArray[17] != 0 ? true : false,
          13: this.itemSizeArray[18] != 0 ? true : false,
          13_5: this.itemSizeArray[19] != 0 ? true : false,
        },
        itemPictures: picArr,
        oneOfAKind: this.oneOfAKind,
        popularity: 0,
        timeAdded: timestamp,
      }).catch((err) => {
        this.error = err
      });

      this.resetForm();
      this.loading = false
    },
    resetForm() {
      this.itemName = ""
      this.itemPrice = 0.00
      this.itemDiscount = 0.00
      this.filters = []
      this.coverPicture = ""
      document.getElementById("cover").value = "";
      this.hoverPicture = ""
      document.getElementById("hover").value = "";
      this.itemPictures = []
      this.oneOfAKind = false
      this.itemSizeArray = new Array(20).fill(0)
    },
    range(size, startAt = 0) {
      return [...Array(size).keys()].map(i => i/2 + startAt);
    }
  },
}
</script>

<style lang='scss' scoped>
.form-outline {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .form-wrapper {
    width: 80%;
    border: black solid 1px;
    border-radius: 25px;
    padding: 20px;
    margin-top: 100px;
    margin-bottom: 50px;

    .title {
      margin-bottom: 10px;
    }

    .input-wrapper {
      width: fit-content;
      margin: 0 auto 10px auto;
      position: relative;

      input, select {
        width: 300px;
        margin: 0.001px;
        font-size: 1rem;
      }

      .discount {
        position: absolute;
        right: -40px;
        top: 2px;
      }

      .range {
        position: relative;
        top: 2.5px;
      }


      .one {
        width: 24px;
        height: 1.5rem;
        position: absolute;
        margin-left: 5px;
        bottom: -2px;
        cursor: pointer;
      }

      .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: center;
        gap: 5px;

        img {
          margin-top: 5px;
          width: 200px;
          height: 200px;
        }
      }

      .filter-wrapper {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;

        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          border: black solid 1px;
          padding: 3px 0 3px 3px;
          margin: 0;
          border-radius: 5px;

          .icon {
            cursor: pointer;
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .quantity {
      width: fit-content;
      margin: 0 auto 2px auto;

      input {
        width: 250px;
      }

      .is-half-width {
        width: 230px;
      }

      .is-half-margin {
        margin-left: 10px;
      }
    }
  }
}

.btn {
  width: fit-content;
  height: 24px;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  background-color: #303030;
  cursor: pointer;
  border: none;
}

.submit {
  height: 2.5rem;
  padding: 0 25px;
  font-size: 1rem;
}
</style>