<template>
    <div class="hero-wrapper">
        <div class="mountains"></div>
        <img class="forest" src="../../public/forest.png" alt="forest">
        <img class='icon' src="../assets/logo.png" alt="">
        <h1>Avarance</h1>
        <router-link class="header" :to="{ name: 'Shop', params: { category: 'all' }}">
            <button>Shop All</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Hero',
    data() {
        return {
        
        }
    },
}
</script>

<style lang='scss' scoped>

.hero-wrapper {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;

    .mountains {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(../../public/mountains.jpg);
        background-attachment: fixed;
    }

    .forest {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }

    h1 {
        font-size: 3.5rem;
        color: #fff;
        -webkit-text-stroke-width: .25px;
        -webkit-text-stroke-color: black;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10rem;
        height: 2.5rem;
        border-radius: 5px;
        font-size: 1.25rem;
        background-color: #800000;
        color: #fff;
        cursor: pointer;
    }

    .icon {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
    }
}
</style>