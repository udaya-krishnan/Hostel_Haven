
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAh3AyNOTGT2T6McTgCBq4Sfjz1P4Ky5Z4",
  authDomain: "hostel-haven.firebaseapp.com",
  projectId: "hostel-haven",
  storageBucket: "hostel-haven.appspot.com",
  messagingSenderId: "345390589746",
  appId: "1:345390589746:web:258de6ff75bd7a9687192b",
  measurementId: "G-MJF7FRXD3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()


