// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvJSLVsm6RPN4zGoESshxuRaj_TW7DmJ4",
    authDomain: "whatsapp-clone-c8ba5.firebaseapp.com",
    projectId: "whatsapp-clone-c8ba5",
    storageBucket: "whatsapp-clone-c8ba5.appspot.com",
    messagingSenderId: "965046383953",
    appId: "1:965046383953:web:ce0132e1cb35f27031cf70",
    measurementId: "G-S9T52FLLZR",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const auth = getAuth(firebaseApp);

// Detect auth state
// onAuthStateChanged(auth, (user) => {
//     if (user !== null) {
//         console.log("logged in!");
//     } else {
//         console.log("No user");
//     }
// });
