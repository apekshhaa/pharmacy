// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdI_mLeawMdXP84k-cc1NdjgkoLgtBoGU",
  authDomain: "autonomous-ai-pharmacy.firebaseapp.com",
  projectId: "autonomous-ai-pharmacy",
  storageBucket: "autonomous-ai-pharmacy.firebasestorage.app",
  messagingSenderId: "783096053930",
  appId: "1:783096053930:web:ca27cdbabe13e6fb0ad0d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;