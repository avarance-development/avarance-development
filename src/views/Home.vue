<template>
  <section class="home">
    <ShopPost :post="post" v-for="(post,index) in shopPostList" :key="index" class="posts"/>
    <router-link class="header" :to="{ name: 'Shop', params: { category: 'all' }}">
      Shop Our Entire Catalog
    </router-link>
    <ProductGrid :queryArray="queryArray" class="grid"/>
  </section>
</template>

<script>
import ShopPost from '../components/ShopPost.vue'
import ProductGrid from '../components/ProductGrid.vue'
import { query, where, collection, getDocs, limit } from "firebase/firestore";  
import { db } from "../firebase/firebaseInit.js"

export default {
  name: 'Home',
  components: {
    ShopPost,
    ProductGrid
  },
  data() {
    return {
      shopPostList: 
      [
        {
          title: "Stainless Steel/Sterling Silver Rings",
          description: "Our Collection of Stainless Steel and Sterling Silver Rings",
          linkTitle: "View Rings",
          photoName: "blurry",
          query: "rings",
        },
        {
          title: "Stainless Steel/Sterling Silver Pendants",
          description: "Our Collection of Stainless Steel and Sterling Silver Pendants",
          linkTitle: "View Pendants",
          photoName: "blurry",
          query: "pendants",
        },
        {
          title: "Stainless Steel/Sterling Silver Earrings",
          description: "Our Collection of Stainless Steel and Sterling Silver Earrings",
          linkTitle: "View Earrings",
          photoName: "blurry",
          query: "earrings",
        },
      ],
      initialQueryList: 
      [ 
        { 
          property: 'itemType', 
          operator: '!=', 
          value: ""
        } 
      ],
      queryArray: [],
    }
  },
  async beforeMount() {
    const queryConditions = this.initialQueryList.map((condition) =>
      where(condition.property, condition.operator, condition.value)
    );


    const queryToPreform = query(
      collection(db, 'products'),
      ...queryConditions,
      limit(24)
    )
    
    const querySnapshot = await getDocs(queryToPreform);

    querySnapshot.forEach((doc) => {
      this.queryArray.push(doc)
      // console.log(doc.id, " => ", doc.data());
    });

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
  
  .header {
    order: 2;
    display: block;
    position: relative;
    width: fit-content;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #000000;
    font-weight: 700;
    font-size: 1.625rem;
    text-decoration: none;
    margin: 25px auto;
  }

  .header:after {
    display: block;
    content: "";
    width: 32vw;
    margin-top: 5px;
    margin-left: -16vw;
    left: 50%;
    position: absolute;
    border-bottom: black solid 3px;
    cursor: default;
  }

  .grid {
    order: 3;
  }
}

</style>
