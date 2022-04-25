import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { firebaseApp } from "../firebase/firebaseInit.js"

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
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const userID = auth.currentUser.uid;
      const docRef = doc(db, 'users', userID)
      const currentDoc = await getDoc(docRef);
      commit("setProfileInfo", currentDoc)
      const token = await user.getIdTokenResult()
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin)
      // const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      // const dbResults = await dataBase.get()
      // commit("setProfileInfo", dbResults)
      // console.log(dbResults)
    }
  },
  modules: {
  }
})
