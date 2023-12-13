import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRyvmiViBlkg3_ZlFVB6VeSwFS4ERiK5g",
  authDomain: "poec-81b3a.firebaseapp.com",
  projectId: "poec-81b3a",
  storageBucket: "poec-81b3a.appspot.com",
  messagingSenderId: "537158219581",
  appId: "1:537158219581:web:04ad2fdc3cf0914a373754",
  measurementId: "G-WKZTLYB5EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth}; 
