import { initializeApp, getApps, getApp } from "firebase/app"; // Added getApp
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { enableIndexedDbPersistence } from "firebase/firestore"; // Optional: For offline support Firestore

/* ---------------- Environment Validation ---------------- */

const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    // Using console.warn for non-critical warnings that shouldn't halt execution
    console.warn(
      `[Firebase Config Warning]: Missing environment variable: ${key}. 
       Please ensure all VITE_FIREBASE_ variables are set in your.env file.`,
    );
  }
});

/* ---------------- Firebase Config ---------------- */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/* ---------------- Initialize App (Prevent Duplicate Init) ---------------- */

// Check if a Firebase app instance already exists to avoid re-initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // Use getApp() to retrieve the default app

/* ---------------- Services ---------------- */

// Export individual Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Optional: Enable Firestore offline persistence
// This is a powerful feature for app-like experiences, but adds complexity.
// You might want to wrap this in a try-catch or conditional check.
/*
try {
  enableIndexedDbPersistence(db)
   .then(() => {
      console.log("Firestore offline persistence enabled successfully.");
    })
   .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn("Firestore persistence failed: Multiple tabs open, persistence already enabled in another tab.");
      } else if (err.code === 'unimplemented') {
        console.warn("Firestore persistence failed: The current browser does not support all of the features required to enable persistence.");
      } else {
        console.error("Firestore persistence failed:", err);
      }
    });
} catch (error) {
  console.error("Error setting up Firestore persistence:", error);
}
*/

// Set custom parameters for Google Auth Provider
googleProvider.setCustomParameters({
  prompt: "select_account", // Forces user to select account every time (useful for multiple accounts)
});

// Also export individual Storage functions that are directly used in services
export { ref, uploadBytes, getDownloadURL };
