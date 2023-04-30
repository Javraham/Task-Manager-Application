// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, query, collection, onSnapshot} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmVWgHVagd0o3w55s16xZrKhW1_yAv99w",
  authDomain: "task-manager-66030.firebaseapp.com",
  projectId: "task-manager-66030",
  storageBucket: "task-manager-66030.appspot.com",
  messagingSenderId: "208956808978",
  appId: "1:208956808978:web:e0f86bddf2865901a09dcb",
  measurementId: "G-LH2Q9JFT64"
};

// Initialize Firebase

app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
