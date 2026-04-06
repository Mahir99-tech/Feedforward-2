import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPNDIxfLPWMF3q-4G3UlLNULSkPKhRE_A",
  authDomain: "feedforward-prototype.firebaseapp.com",
  projectId: "feedforward-prototype",
  storageBucket: "feedforward-prototype.firebasestorage.app",
  messagingSenderId: "147920986260",
  appId: "1:147920986260:web:e531da5f13071d82945481",
  measurementId: "G-RVR453JXE4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPNDIxfLPWMF3q-4G3UlLNULSkPKhRE_A",
  authDomain: "feedforward-prototype.firebaseapp.com",
  projectId: "feedforward-prototype",
  storageBucket: "feedforward-prototype.firebasestorage.app",
  messagingSenderId: "147920986260",
  appId: "1:147920986260:web:e531da5f13071d82945481",
  measurementId: "G-RVR453JXE4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
*/