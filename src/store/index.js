import Vue from 'vue'
import Vuex from 'vuex'
import { doc, getDoc, writeBatch } from "firebase/firestore"
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
    },
    addItemToStarred(state, payload) {
      state.starredItems.push(payload);
    },
    removeItemFromStarred(state, payload) {
      state.starredItems.splice(payload, 1);
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
      // To be uncommented later in order to prevent changes to the db
      /*
      const batch = writeBatch(db);
      try {
        for (const item of state.cart) {

          const docRef = doc(db, 'products', item.itemID);
          const itemInfo = await getDoc(docRef);
          const itemData = itemInfo.data()
          const size = ((item.itemSize).toString()).replace('.', '')
          const dbQuantity = itemData.itemSizes[size];
          const cartQuantity = item.itemQuantity;

          if (dbQuantity - cartQuantity < 0) {
            throw `${item.itemName}'s quantity has been reduced to ${dbQuantity}`;
          } else {
            
            const sizesRoute = 'itemSizes.' + size
            const newQuant = dbQuantity - cartQuantity;
            batch.update(docRef, { [sizesRoute] : newQuant});

            if (newQuant == 0) {
              const boolRoute = 'sizesBool.' + size
              batch.update(docRef, { [boolRoute] : false });
            }
            const remainingTotalQuant = itemData.itemTotalQuantity - cartQuantity;
            batch.update(docRef, { "itemTotalQuantity" : remainingTotalQuant })
            
            if (remainingTotalQuant == 0) {
              batch.update(docRef, { "itemInStock" : false })
            }
            const popularityInc = itemData.popularity + cartQuantity
            batch.update(docRef, { "popularity" : popularityInc })
          }
        }
      } catch (error) {
        state.message = error.message
        console.log(error.message)
        return
      }

      await batch.commit();
      */

      const createStripeCheckout = await httpsCallable(functions, 'createStripeCheckout');
      const stripe = Stripe('pk_test_51L4FhgBwBXl7BBnbQXhlhoJX9r1z6wcNhlnGNZMx0xUGAbP5mrFzlMWmlxrxM7GLnzAxjEmc78mgGaYYYkTbhrj100sHoY0ylB');
      createStripeCheckout({ cart: state.cart }).then((response) => {
        const sessionId = response.data.id;
        stripe.redirectToCheckout({ sessionId: sessionId})
      })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
