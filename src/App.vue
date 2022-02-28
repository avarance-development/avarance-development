<template>
  <div id="app">
    <Navigation />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
export default {
  components: {
    Navigation,

  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  text-align: center;
  font-family: 'Varela Round', sans-serif;
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

:root, html[data-theme='light'] {
  --bg: rgba(255, 255, 255, 0.85);
}

html[data-theme='dark'] {
  --bg: #222222;
}
</style>
