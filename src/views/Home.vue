<template>
  <section class="home">
    <Hero/>
    <ShopPost :post="post" v-for="(post,index) in shopPostList" :key="index" class="posts"/>
    <router-link id="header" class="header" :to="{ name: 'Shop', params: { category: 'all' }}">
      Shop Our Entire Catalog
    </router-link>
    <ProductGrid @shift-query="shiftQuery($event)" :currentPageNumber="currentPageNumber" :queryArray="queryArray" class="grid" :loading="loading"/>
  </section>
</template>

<script>
import ShopPost from '../components/ShopPost.vue';
import ProductGrid from '../components/ProductGrid.vue';
import Hero from '../components/Hero.vue';
import { query, collection, getDocs, limit, startAfter, endBefore, orderBy } from "firebase/firestore";  
import { db } from "../firebase/firebaseInit.js";

export default {
  name: 'Home',
  components: {
    Hero,
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
      queryArray: [],
      limit: this.$store.state.limit,
      currentPageNumber: 0,
      loading: true,
    }
  },
  methods: {
    async shiftQuery(direction) {
      this.loading = true;
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
      if (direction == 1) {
        queryToPreform = query(colRef, orderBy("popularity"), startAfter(lastQuery), limit(this.limit))
      } else {
        queryToPreform = query(colRef, orderBy("popularity"), endBefore(firstQuery), limit(this.limit))
      }

      const querySnapshot = await getDocs(queryToPreform).then((result) => {
        let rectY = document.getElementById('header').offsetTop;
        window.scrollTo({ top: rectY - (61 + 25), behavior: 'smooth' });
        return result;
      });
      // attempt to reinstantiate the array with documents one at a time
      this.queryArray = [];
      querySnapshot.forEach((doc) => {
          this.queryArray.push(doc)
      });

      this.loading = false;
    },
  },
  async beforeMount() {
    const queryToPreform = query(
      collection(db, 'products'),
      orderBy("popularity"),
      limit(this.limit)
    )
    
    const querySnapshot = await getDocs(queryToPreform);
    this.queryArray = []
    querySnapshot.forEach((doc) => {
      this.queryArray.push(doc)
    });
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>

.home {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px 1px rgba(0, 0, 0, 0.4);
  overflow-x: hidden;
  
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
