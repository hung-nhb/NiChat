import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDbvQB9PSUdbLiVXAlX48UaOlCVVsl2E84",
  authDomain: "hungnhb-nichat.firebaseapp.com",
  projectId: "hungnhb-nichat",
  storageBucket: "hungnhb-nichat.appspot.com",
  messagingSenderId: "401710305060",
  appId: "1:401710305060:web:98f436cb784b1efdcdadb1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };