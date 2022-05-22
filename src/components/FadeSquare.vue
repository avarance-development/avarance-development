<template>
  <router-link class="nav-link" :to="{ name: 'ViewProduct', params: { category: doc.itemType, productId: doc.itemID } }">
    <img class="first" :src="doc.itemPictures[0]" alt="Cover Photo" />
    <img class="second" :src="doc.itemPictures[1]" alt="Hover Photo" />
    <h6 class="metal-description">{{  doc.metalMaterial  }}</h6>
    <h2 class="product-title">{{  doc.itemName  }}</h2>
    <h3 class="product-price">${{  doc.itemPrice.toFixed(2)  }}</h3>
  </router-link>
</template>

<script>
export default {
  name: "FadeSquare",
  props: ["doc"],
};
</script>

<style lang="scss" scoped>
.nav-link {
  width: fit-content;
  height: fit-content;
  position: relative;
  text-decoration: none;
  color: black;
  
  .first {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 100%;
    height: auto;
    opacity: 1;
  }
  .first:hover {
    opacity: 0;
  }

  .second {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: 0;
  }
  .second:hover {
    opacity: 1;
  }

  .metal-description {
    font-size: 0.67rem;
    color: #888888;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .product-title {
    display: inline-block;
    margin: 2px 20px;
    font-size: 1.5rem;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    overflow-wrap: break-word;
  }

  .product-price {
    color: #888888;
    font-size: 1rem;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-bottom: 10px;
  }
}
</style>