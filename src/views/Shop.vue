<template>
  <section class="container">
      <div class="aside">

      </div>
      <div class="grid">
        <FadeSquare class='square' v-for="square in 24" :key="square" />
      </div>
  </section>
</template>

<script>
export default {
    name: "Shop",
    data() {
        return {
            
        }
    },
    
}
</script>

<style lang="scss" scoped>

.container {
    display: flex;
    flex-direction: row;
    .aside {
        background-color: #ebebeb;
        flex-basis: 25%;
    }
    .grid {
        flex-basis: 75%;
        .square {

        }
    }
}


</style>