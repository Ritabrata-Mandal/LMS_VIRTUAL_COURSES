// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-d07a9.firebaseapp.com",
  projectId: "loginvirtualcourses-d07a9",
  storageBucket: "loginvirtualcourses-d07a9.firebasestorage.app",
  messagingSenderId: "409959303313",
  appId: "1:409959303313:web:cde631b73b8ccd00c25730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};