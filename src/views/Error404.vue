<template>
  <div class="container">
      <h1>
          ERROR 404
      </h1>
  </div>
</template>

<script>
export default {
    name: "Error404",
}
</script>

<style lang='scss' scoped>

.container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    h1 {
        margin: auto;
        color: red;
    }
}
</style>