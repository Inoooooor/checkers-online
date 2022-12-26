// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJwHKBT0VyRBrq_2SN6ccwAdPPQTT1Ppo",
  authDomain: "checkers-1bbc2.firebaseapp.com",
  projectId: "checkers-1bbc2",
  storageBucket: "checkers-1bbc2.appspot.com",
  messagingSenderId: "818144469734",
  appId: "1:818144469734:web:e897271f15aa80cafe5127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const authUi = new firebaseui.auth.AuthUI(auth); 

export default db