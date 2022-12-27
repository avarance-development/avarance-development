import Vue from 'vue'
import Vuex from 'vuex'
import { doc, getDoc, collection, setDoc } from "firebase/firestore"
import { auth, db, functions } from "../firebase/firebaseInit.js"
import { httpsCallable } from "firebase/functions"
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
    starredItems: [],
    sessionID: null,
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
    },
    setCurrentItem(state, payload) {
      state.currentItem = payload
    },
    addItemToCart(state, payload) {
      let original = state.cart.find((value, index, array) => {
        return value.uniqueID == payload.uniqueID;
      })
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
    },
    addItemToStarred(state, payload) {
      state.starredItems.push(payload);
    },
    removeItemFromStarred(state, payload) {
      state.starredItems.splice(payload, 1);
    },
    clearCart(state) {
      state.cart = [];
    },
    setSessionID(state, payload) {
      state.sessionID = payload;
    },
    clearSessionID(state) {
      state.sessionID = null;
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
    },
    async checkout({ commit, state}) {

      const newPaymentIntent = collection(db, "paymentIntent")
      const paymentID  = doc(newPaymentIntent).id
      try {
        await setDoc(doc(db, "paymentIntent", paymentID), {
          cart: state.cart
        })
      } catch (error) {
        //
      }


      if (state.sessionID != null) {
        const expireSession = await httpsCallable(functions, 'expireSession');
        const id = state.sessionID
        expireSession({ id }).then(async (result) => {
          const createStripeCheckout = await httpsCallable(functions, 'createStripeCheckout');
          const stripe = Stripe('pk_test_51L4FhgBwBXl7BBnbQXhlhoJX9r1z6wcNhlnGNZMx0xUGAbP5mrFzlMWmlxrxM7GLnzAxjEmc78mgGaYYYkTbhrj100sHoY0ylB');
          createStripeCheckout({ cart: state.cart, paymentID: paymentID }).then((response) => {
            const sessionId = response.data.id;
            commit("setSessionID", sessionId);
            stripe.redirectToCheckout({ sessionId: sessionId})
          })
        })
      } else {
        const createStripeCheckout = await httpsCallable(functions, 'createStripeCheckout');
        const stripe = Stripe('pk_test_51L4FhgBwBXl7BBnbQXhlhoJX9r1z6wcNhlnGNZMx0xUGAbP5mrFzlMWmlxrxM7GLnzAxjEmc78mgGaYYYkTbhrj100sHoY0ylB');
        createStripeCheckout({ cart: state.cart, paymentID: paymentID }).then((response) => {
          const sessionId = response.data.id;
          commit("setSessionID", sessionId);
          stripe.redirectToCheckout({ sessionId: sessionId})
        })
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
