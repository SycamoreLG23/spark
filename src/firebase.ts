// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDW0YY4EkzjiXb5gjbJ8mx0rMEffv2S4K0",
    authDomain: "gratitude-417bc.firebaseapp.com",
    projectId: "gratitude-417bc",
    storageBucket: "gratitude-417bc.appspot.com",
    messagingSenderId: "818418466159",
    appId: "1:818418466159:web:1621436817a109413cbc9a",
    measurementId: "G-K1Q8QLQZQE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage = getStorage(app);
export default app;
