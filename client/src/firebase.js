// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "house-harbour.firebaseapp.com",
  projectId: "house-harbour",
  storageBucket: "house-harbour.appspot.com",
  messagingSenderId: "978131597879",
  appId: "1:978131597879:web:17e1e622ded4a7f5e9ddb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);