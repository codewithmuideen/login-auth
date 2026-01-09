// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9yuDVV2WunfJyqyb2Ooh9QBqxq0GZzeI",
  authDomain: "login-auth-78af9.firebaseapp.com",
  projectId: "login-auth-78af9",
  storageBucket: "login-auth-78af9.appspot.com", // <--- corrected
  messagingSenderId: "122690321016",
  appId: "1:122690321016:web:b6415d5f4eb1b6b78e4b8d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
