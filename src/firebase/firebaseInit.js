import {  initializeApp  } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth  } from "firebase/auth"
import { getFunctions } from "firebase/functions"

const firebaseConfig = {
    apiKey: "AIzaSyDDCEiGzmIwvpEPo25KvDPAMHYVOzV4uqE",
    authDomain: "avarance-development.firebaseapp.com",
    projectId: "avarance-development",
    storageBucket: "avarance-development.appspot.com",
    messagingSenderId: "522587356628",
    appId: "1:522587356628:web:7f5193fbcdd5d056c52a41",
    measurementId: "G-SP1RZHX8T7"
};

const firebaseApp = initializeApp(firebaseConfig);
const timestamp = serverTimestamp();
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const functions = getFunctions(firebaseApp);
// const analytics = getAnalytics(firebaseApp);

export { timestamp, db, auth, functions };