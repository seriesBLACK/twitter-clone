import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRBASE_API_KEY,
  authDomain: "twitter-80683.firebaseapp.com",
  projectId: "twitter-80683",
  storageBucket: "twitter-80683.appspot.com",
  messagingSenderId: "1066393331949",
  appId: "1:1066393331949:web:d635cc1266f7af622484e4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };