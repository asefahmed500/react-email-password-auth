// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyALTmWrYOe6Aths7dyULBQ7IDbCrgZt7Dc",
  authDomain: "react-email-password-a03b1.firebaseapp.com",
  projectId: "react-email-password-a03b1",
  storageBucket: "react-email-password-a03b1.appspot.com",
  messagingSenderId: "47235405025",
  appId: "1:47235405025:web:b0bc151d4daf5e9b4153a0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;