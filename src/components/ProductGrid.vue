<template>
  <section class="container">
    <transition name="none" mode="out-in">
      <transition-group tag="section" class="grid" appear name="fade" v-if="queryArray.length > 0">
        <FadeSquare :doc="doc.data()" v-for="doc in queryArray" :key="doc.data().itemID" />
      </transition-group>
      <div v-else-if="loading" class="loading">
        <span class="outer"></span>
        <span class="inner"></span>
        <span class="innermost"></span>
      </div>
      <p v-else>No items match your filtered results!</p>
    </transition>
  </section>
</template>

<script>
import FadeSquare from '../components/FadeSquare.vue'
export default {
    name: "ProductGrid",
    components: {
        FadeSquare,
    },
    props: ["queryArray", "loading"],
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 20px;

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(225px, 0.5fr));
        justify-content: center;
        justify-items: center;
        gap: 20px;
        margin-bottom: 30px;

        @media(max-width: 525px) {
            grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
            gap: 10px;
        }
    }

    @keyframes circle-loading {
        to {
            transform: rotateZ(360deg);
        }
    }

    .loading {
        height: 100%;
        width: 100%;
        z-index: 101;
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
}

.fade-enter-active,
.fade-move {
    transition: 0.4s ease all;
}

.fade-leave-active {
    transition: 0.4s ease all;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    max-width: 250px;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.4);
    transform-origin: top left;
}

.none-enter-active,
.none-leave-active {
    transition: 0.4s ease all;
}

.none-enter-from,
.none-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>