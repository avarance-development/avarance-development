<template>
  <div id="app">
    <Navigation v-if="!navigation"/>
    <router-view/>
    <Footer v-if="!navigation"/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  data() {
    return {
      navigation: null,
    }
  },
  components: {
    Navigation,
    Footer,
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (this.$route.name == "Login" || 
        this.$route.name == "Register" || 
        this.$route.name == "ResetPassword") {
        this.navigation = true;
      } else {
        this.navigation = false;
      }
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
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
