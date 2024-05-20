import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBiMRDX9X3jlUbxtvS3eJGoYgsEpi3oQ4",
  authDomain: "testbe-e9e4c.firebaseapp.com",
  projectId: "testbe-e9e4c",
  storageBucket: "testbe-e9e4c.appspot.com",
  messagingSenderId: "643001645464",
  appId: "1:643001645464:web:8e9a5ea770daa942f853ed",
  measurementId: "G-K0W3G4PR7V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, analytics, db, auth, storage,firebaseConfig };
