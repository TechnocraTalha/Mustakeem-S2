import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase securely to prevent double initialization during HMR
let app, db, auth, storage;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization skipped (expected during Vercel build if env vars are missing):", error.message);
}

export { db, auth, storage };
