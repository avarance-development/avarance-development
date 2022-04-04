import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDCEiGzmIwvpEPo25KvDPAMHYVOzV4uqE",
    authDomain: "avarance-development.firebaseapp.com",
    projectId: "avarance-development",
    storageBucket: "avarance-development.appspot.com",
    messagingSenderId: "522587356628",
    appId: "1:522587356628:web:7f5193fbcdd5d056c52a41",
    measurementId: "G-SP1RZHX8T7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const analytics = getAnalytics(firebaseApp);

export { timestamp };
export default firebaseApp.firestore();