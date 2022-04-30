<template>
  <router-link class="nav-link" :to="{ name: 'Home' }">
    <img class="first" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDW1NPwiSHPWWwsh-GCMKXzv4Ckw8YwmEuZ7f3i6U-l2wSpVqUAje6JXQkye7hXhQnR84&usqp=CAU" alt="Cover Photo" />
    <img class="second" src="./../assets/productphotos/1to1.png" alt="Hover Photo" />
    <h6 class="metal-description">Metal Description</h6>
    <h2 class="product-title">Product Title</h2>
    <h3 class="product-price">Product Price</h3>
  </router-link>
</template>

<script>
export default {
  name: "FadeSquare",
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
    max-width: 100%;
    height: auto;
    opacity: 1;
  }
  .first:hover {
    opacity: 0;
  }

  .second {
    max-width: 100%;
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
    font-size: 1.5rem;
    margin: 2px 0;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .product-price {
    color: #888888;
    font-size: 1rem;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-bottom: 10px;
  }
}
</style>