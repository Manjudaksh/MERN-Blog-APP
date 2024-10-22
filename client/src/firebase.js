// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2ce8e.firebaseapp.com",
  projectId: "mern-blog-2ce8e",
  storageBucket: "mern-blog-2ce8e.appspot.com",
  messagingSenderId: "1051392241269",
  appId: "1:1051392241269:web:d2c9c7201ddbf2187d523c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);