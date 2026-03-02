// services/auth.service.js

import { auth, googleProvider, db } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { setItem, getItem, removeItem } from "./localStorage.service";

const USER_COLLECTION = "users";
const LOCAL_USER_KEY = "app_user";

/* -------------------------
   Helper: Fetch User Profile
-------------------------- */
const fetchUserProfile = async (firebaseUser) => {
  const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("User profile not found.");
  }

  const userData = snap.data();

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    ...userData,
  };
};

/* -------------------------
   Signup (Email + Password)
-------------------------- */
export const signupUserWithEmail = async (
  email,
  password,
  role,
  additionalData = {}
) => {
  try {
    if (!role) throw new Error("User role is required.");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    const userPayload = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role,
      isActive: true,
      profileCompleted: false,
      createdAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(doc(db, USER_COLLECTION, firebaseUser.uid), userPayload);

    const user = await fetchUserProfile(firebaseUser);

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(error.message || "Signup failed.");
  }
};

/* -------------------------
   Login (Email + Password)
-------------------------- */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    const user = await fetchUserProfile(firebaseUser);

    if (!user.isActive) {
      throw new Error("Account is disabled.");
    }

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Invalid email or password.");
  }
};

/* -------------------------
   Google Login / Signup
-------------------------- */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
    const snap = await getDoc(userRef);

    let user;

    if (snap.exists()) {
      user = await fetchUserProfile(firebaseUser);
    } else {
      // 🔥 IMPORTANT:
      // Do NOT auto-assign permanent role silently in production SaaS.
      // Better: mark as "pendingRole" and redirect to role selection screen.

      const newUserPayload = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: "candidate", // default (change later if needed)
        isActive: true,
        profileCompleted: false,
        createdAt: serverTimestamp(),
        provider: "google",
      };

      await setDoc(userRef, newUserPayload);
      user = newUserPayload;
    }

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Google auth error:", error);
    throw new Error(error.message || "Google authentication failed.");
  }
};

/* -------------------------
   Logout
-------------------------- */
export const logout = async () => {
  try {
    await firebaseSignOut(auth);
    removeItem(LOCAL_USER_KEY);
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(error.message || "Logout failed.");
  }
};

/* -------------------------
   Get Current User (Local)
-------------------------- */
export const getCurrentUser = () => {
  return getItem(LOCAL_USER_KEY);
};