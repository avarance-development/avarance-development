import Vue from 'vue'
import Vuex from 'vuex'
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebaseInit.js"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    cart: [],
    currentItem: null,
    message: "",
    limit: 12,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.id
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload
      console.log(payload)
    },
    setCurrentItem(state, payload) {
      state.currentItem = payload
      console.log("state committing", payload)
    },
    addItemToCart(state, payload) {
      let original = state.cart.find((value, index, array) => {
        console.log(value)
        return value.uniqueID == payload.uniqueID;
      })
      console.log(original)
      if (original == null) {
        state.cart.push(payload);
        state.message = "Added to Cart!"
      } else if (original.itemQuantity + payload.itemQuantity <= payload.maxQuantity) {
        original.itemQuantity += payload.itemQuantity;
        state.message = "Same Item and Quantity found in Cart, merged!"
      } else {
        state.message = "Amount in Cart would exceed the amount available!"
      }
    },
    removeCartItem(state, payload) {
      state.cart.splice(payload, 1);
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const userID = auth.currentUser.uid;
      const docRef = doc(db, 'users', userID)
      const currentDoc = await getDoc(docRef);
      commit("setProfileInfo", currentDoc)
      const token = await user.getIdTokenResult()
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
