import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebaseInit.js"

Vue.config.productionTip = false

let app;
onAuthStateChanged(auth, () => {
  if(!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});


