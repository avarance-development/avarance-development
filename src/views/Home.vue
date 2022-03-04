<template>
  <section class="home">
    <ShopPost :post="post" v-for="(post,index) in shopPostList" :key="index" class="posts"/>
    <ProductGrid class="grid"/>
  </section>
</template>

<script>
// @ is an alias to /src
import ShopPost from '../components/ShopPost.vue'
import ProductGrid from '../components/ProductGrid.vue'

export default {
  name: 'Home',
  components: {
    ShopPost,
    ProductGrid
  },
  data() {
    return {
      shopPostList: [
        {
          title: "Stainless Steel Rings",
          description: "This is a temperary description 1",
          linkTitle: "View Stainless Steel Rings",
          photoName: "blurry"
        },
        {
          title: "This is a temperary title 2",
          description: "This is a temperary description 2",
          linkTitle: "This is a temperary link",
          photoName: "blurry"
        },
        {
          title: "This is a temperary title 3",
          description: "This is a temperary description 3",
          linkTitle: "This is a temperary link",
          photoName: "blurry"
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px 1px rgba(0, 0, 0, 0.4);
  
  .posts {
    order: 1;
  }
  .grid {
    order: 2;
  }
}
</style>
