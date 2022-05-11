<template>
  <section class="container">
      <transition-group tag="section" class="grid">
        <FadeSquare :doc="doc.data()" v-for="doc in queryArray" :key="doc.data().itemID" />
      </transition-group>
  </section>
</template>

<script>
import FadeSquare from '../components/FadeSquare.vue'
export default {
    name: "ProductGrid",
    components: {
        FadeSquare,
    },
    props: ["queryArray"],
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 20px;

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(225px, 0.5fr));
        justify-content: center;
        justify-items: center;
        gap: 20px;
        margin-bottom: 30px;

        @media(max-width: 525px) {
            grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
            gap: 10px;
        }
    }

}
</style>