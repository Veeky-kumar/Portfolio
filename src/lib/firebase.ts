import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv2NndmWXZxPgIZv5ximsvrqStwdrZW1c",
  authDomain: "my-portfolio-279d3.firebaseapp.com",
  projectId: "my-portfolio-279d3",
  storageBucket: "my-portfolio-279d3.firebasestorage.app",
  messagingSenderId: "759881437272",
  appId: "1:759881437272:web:d2c812125ff7e2cdedfa2d",
  measurementId: "G-FX3V50F2JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
