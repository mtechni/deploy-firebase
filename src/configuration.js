  // src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDtoz0_iweuFnu-hAi1Qgb3JO4nRzHPuK4",
//   authDomain: "reactjs-with-firebase-644c7.firebaseapp.com",
//   databaseURL: "https://reactjs-with-firebase-644c7-default-rtdb.firebaseio.com",
//   projectId: "reactjs-with-firebase-644c7",
//   storageBucket: "reactjs-with-firebase-644c7.appspot.com",
//   messagingSenderId: "51786408761",
//   appId: "1:51786408761:web:58b609bf86df07ac087ee8",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAWmST73pRsfw7IhuoaqeY93UjdJC9RSOs",
  authDomain: "fir-with-reactjs-21176.firebaseapp.com",
  projectId: "fir-with-reactjs-21176",
  storageBucket: "fir-with-reactjs-21176.appspot.com",
  messagingSenderId: "840653005555",
  appId: "1:840653005555:web:baa92879c5d8d678c1cd86",
  measurementId: "G-N3ZVBNR700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
