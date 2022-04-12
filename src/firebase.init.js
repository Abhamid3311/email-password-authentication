// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVx01RoQY955qiD4G2Uo43UegtrfOWLWI",
    authDomain: "email-pass-auth-9dacc.firebaseapp.com",
    projectId: "email-pass-auth-9dacc",
    storageBucket: "email-pass-auth-9dacc.appspot.com",
    messagingSenderId: "145611256375",
    appId: "1:145611256375:web:473dca0bf84716b1ce45b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;