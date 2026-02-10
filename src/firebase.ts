// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig_OLD = {
  apiKey: "AIzaSyC1iTRINjE13yJ27790qXbvxi9iPBwS8sg",
  authDomain: "personal-diary-2026-alpha.firebaseapp.com",
  projectId: "personal-diary-2026-alpha",
  storageBucket: "personal-diary-2026-alpha.firebasestorage.app",
  messagingSenderId: "955801749366",
  appId: "1:955801749366:web:bb756c6f49b5e5feb3dc57"
};

const firebaseConfig = {
  apiKey: "AIzaSyAa61lE0MevhKHiZin65fHs0-_HptFgZmA",
  authDomain: "personal-diary-2026-beta.firebaseapp.com",
  projectId: "personal-diary-2026-beta",
  storageBucket: "personal-diary-2026-beta.firebasestorage.app",
  messagingSenderId: "880176719664",
  appId: "1:880176719664:web:8fbe5edb7129408cf60af5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Auth service for use in components
export const auth = getAuth(app);
export const db = getFirestore(app)