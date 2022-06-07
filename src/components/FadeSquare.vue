<template>
  <router-link class="nav-link" :to="{ name: 'ViewProduct', params: { category: doc.itemType, productId: doc.itemID, item: doc } }">
    <img class="first" :src="doc.itemPictures[0]" alt="Cover Photo" />
    <img class="second" :src="doc.itemPictures[1]" alt="Hover Photo" />
    <img v-if="doc.itemTotalQuantity == 0" class="second stock" src="../assets/OutofStock.png" alt="Out of Stock">
    <h6 class="metal-description">{{  doc.metalMaterial  }}</h6>
    <h2 class="product-title">{{  doc.itemName  }}</h2>
    <h6 v-if="doc.itemDiscount != 0" class="product-price discount">%{{ (doc.itemDiscount * 100).toFixed(0) }} Off</h6>
    <div class="price-container">
      <h6 v-if="doc.itemPrice != doc.itemOriginalPrice" class="product-price original">${{ doc.itemOriginalPrice.toFixed(2) }}</h6>
      <h6 v-if="doc.itemPrice != doc.itemOriginalPrice" class="product-price original">-></h6>
      <h3 class="product-price">${{  doc.itemPrice.toFixed(2)  }}</h3>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "FadeSquare",
  props: ["doc"],
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.nav-link {
  width: 100%;
  height: fit-content;
  position: relative;
  text-decoration: none;
  color: black;
  
  img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .first {
    opacity: 1;
  }
  .first:hover {
    opacity: 0;
  }

  .second {
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: 0;
  }
  .second:hover {
    opacity: 1;
  }

  .stock {
    opacity: 1;
    pointer-events: none;
    z-index: 10;
  }

  .metal-description {
    font-size: 0.67rem;
    color: #888888;
  }

  .product-title {
    display: inline-block;
    margin: 0 20px;
    font-size: 1.5rem;
    overflow-wrap: break-word;
  }

  .price-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;

    .product-price {
      color: #888888;
      font-size: 1rem;
    }

    .original {
      color: #800000;
      text-decoration: line-through;
    }

  }
  .discount {
    font-size: 1rem;
    color: #800000;
  }
}
</style>