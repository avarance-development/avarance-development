const functions = require("firebase-functions");
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyDDCEiGzmIwvpEPo25KvDPAMHYVOzV4uqE",
    authDomain: "avarance-development.firebaseapp.com",
    projectId: "avarance-development",
    storageBucket: "avarance-development.appspot.com",
    messagingSenderId: "522587356628",
    appId: "1:522587356628:web:7f5193fbcdd5d056c52a41",
    measurementId: "G-SP1RZHX8T7"
};

admin.initializeApp(firebaseConfig);

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin!`
        }
    }).catch((err) => {
        return {
            message: err.message
        }
    })
})
