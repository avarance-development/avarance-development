<template>
  <div class="loading">
      <span class="outer"></span>
      <span class="inner"></span>
      <span class="innermost"></span>
  </div>
</template>

<script>
export default {
    name: "Loading",
}
</script>

<style lang='scss' scoped>

@keyframes circle-loading {
    to {
        transform: rotateZ(360deg);
    }
}

.loading {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 101;
    background-color: rgba($color: #000000, $alpha: 0.4);
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        display: block;
        position: absolute;
        border-radius: 50%;
        border: 4px solid transparent;
    }

    .outer {
        width: 70px;
        height: 70px;
        border-top-color: #000;
        border-bottom-color: #000;
        animation: circle-loading 1500ms ease-in-out infinite;
    }

    .inner {
        width: 50px;
        height: 50px;
        border-left-color: #000;
        border-right-color: #000;
        animation: circle-loading 1200ms ease-in-out infinite;
    }

    .innermost {
        width: 30px;
        height: 30px;
        border-top-color: #000;
        border-bottom-color: #000;
        animation: circle-loading 900ms ease-in-out infinite;
    }
}
</style>