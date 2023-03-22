// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATHRyKW7brq5A9WoQwU59nRpctTNhdsjg",
  authDomain: "goit-rn-project.firebaseapp.com",
  projectId: "goit-rn-project",
  storageBucket: "goit-rn-project.appspot.com",
  messagingSenderId: "461608729833",
  appId: "1:461608729833:web:6f9778ca321fc8f8c3c478",
  measurementId: "G-L3KYSWG510",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// export default auth;
