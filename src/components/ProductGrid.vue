<template>
  <section class="container">
      <router-link class="header" :to="{ name: 'Home' }">
          Heading Tag
      </router-link>
      <transition-group tag="section" class="grid">
        <FadeSquare v-for="square in 24" :key="square" />
      </transition-group>
      <div class="pagination">
          PAGINATION TO BE IMPLEMENTED
      </div>
  </section>
</template>

<script>
import FadeSquare from '../components/FadeSquare.vue'
export default {
    name: "ProductGrid",
    components: {
        FadeSquare,
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 20px;

    .header {
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
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-flow: row;
        justify-items: center;
        gap: 30px;
        margin-bottom: 30px;

        @media(max-width: 1300px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media(max-width: 1000px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media(max-width: 700px) {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 150px;
        background-color: rgba(0,0,0,0.6);
        margin-bottom: 20px;
    }
}
</style>