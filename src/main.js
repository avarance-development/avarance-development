import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { firebaseApp } from "./firebase/firebaseInit.js"

Vue.config.productionTip = false

let app;
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, () => {
  if(!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});


