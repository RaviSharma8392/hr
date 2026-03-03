// services/auth.service.js

import { auth, googleProvider, db } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { setItem, getItem, removeItem } from "../localStorage/localStorage.service";

const USER_COLLECTION = "users";
const LOCAL_USER_KEY = "app_user";

/* =========================================================
   Utility: Normalize Errors
========================================================= */
const normalizeError = (error) => {
  if (!error) return "Something went wrong.";
  if (typeof error === "string") return error;
  return error.message || "Something went wrong.";
};

/* =========================================================
   Utility: Build User Object
========================================================= */
const buildUserObject = (firebaseUser, profileData) => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    ...profileData,
  };
};

/* =========================================================
   Fetch Profile (Single Read)
========================================================= */
const getUserProfile = async (firebaseUser) => {
  const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("User profile not found.");
  }

  return buildUserObject(firebaseUser, snap.data());
};

/* =========================================================
   SIGNUP (Email + Password)
========================================================= */
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

    // Optional: enforce email verification
    await sendEmailVerification(firebaseUser);

    const userPayload = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role,
      isActive: true,
      profileCompleted: false,
      provider: "password",
      createdAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(doc(db, USER_COLLECTION, firebaseUser.uid), userPayload);

    const user = buildUserObject(firebaseUser, userPayload);

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(normalizeError(error));
  }
};

/* =========================================================
   LOGIN (Email + Password)
========================================================= */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    const user = await getUserProfile(firebaseUser);

    if (!user.isActive) {
      throw new Error("Account is disabled.");
    }

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(normalizeError(error));
  }
};

/* =========================================================
   GOOGLE LOGIN / SIGNUP (Optimized)
========================================================= */
export const loginWithGoogle = async (defaultRole = "candidate") => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
    const snap = await getDoc(userRef);

    let user;

    if (snap.exists()) {
      // Existing user
      user = buildUserObject(firebaseUser, snap.data());
    } else {
      // First-time Google login
      const newUserPayload = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: defaultRole, // safer to pass role explicitly
        isActive: true,
        profileCompleted: false,
        provider: "google",
        createdAt: serverTimestamp(),
      };

      await setDoc(userRef, newUserPayload);

      user = buildUserObject(firebaseUser, newUserPayload);
    }

    if (!user.isActive) {
      throw new Error("Account is disabled.");
    }

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    console.error("Google auth error:", error);
    throw new Error(normalizeError(error));
  }
};

/* =========================================================
   UPDATE PROFILE
========================================================= */
export const updateUserProfile = async (uid, updates) => {
  try {
    const userRef = doc(db, USER_COLLECTION, uid);

    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    const updatedUser = {
      ...getItem(LOCAL_USER_KEY),
      ...updates,
    };

    setItem(LOCAL_USER_KEY, updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Update profile error:", error);
    throw new Error(normalizeError(error));
  }
};

/* =========================================================
   MARK PROFILE COMPLETE
========================================================= */
export const markProfileCompleted = async (uid) => {
  return updateUserProfile(uid, { profileCompleted: true });
};

/* =========================================================
   LOGOUT
========================================================= */
export const logout = async () => {
  try {
    await firebaseSignOut(auth);
    removeItem(LOCAL_USER_KEY);
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(normalizeError(error));
  }
};

/* =========================================================
   GET CURRENT USER (LOCAL CACHE)
========================================================= */
export const getCurrentUser = () => {
  return getItem(LOCAL_USER_KEY);
};