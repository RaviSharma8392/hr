import { auth, googleProvider, db } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  setItem,
  getItem,
  removeItem,
} from "../localStorage/localStorage.service";

/* ================= CONFIG ================= */

const USER_COLLECTION = "users";
const LOCAL_USER_KEY = "app_user";

/* ================= UTILITIES ================= */

const normalizeError = (error) => {
  if (!error) return "Something went wrong";
  if (typeof error === "string") return error;
  return error.message || "Something went wrong";
};

const buildUserObject = (firebaseUser, profileData = {}) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  emailVerified: firebaseUser.emailVerified,
  ...profileData,
});

const enforceSecurityRules = (user, requiredRole = null) => {
  if (!user?.isActive) {
    throw new Error("Account disabled");
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error(`Access restricted to ${requiredRole} accounts only.`);
  }

  return true;
};

/* ================= PROFILE FETCH ================= */

const getUserProfile = async (firebaseUser) => {
  const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("Profile not found");
  }

  return buildUserObject(firebaseUser, snap.data());
};

/* ================= SIGNUP ================= */

export const signupUserWithEmail = async (
  email,
  password,
  role,
  additionalData = {}
) => {
  try {
    if (!role) throw new Error("Role required");

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = credential.user;

    await sendEmailVerification(firebaseUser);

    const payload = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role,
      provider: "password",
      isActive: true,
      profileCompleted: false,
      createdAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(doc(db, USER_COLLECTION, firebaseUser.uid), payload);

    const user = buildUserObject(firebaseUser, payload);

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    throw new Error(normalizeError(error));
  }
};

/* ================= EMAIL LOGIN ================= */

export const loginWithEmail = async (
  email,
  password,
  requiredRole = null
) => {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = credential.user;

    if (!firebaseUser.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    const user = await getUserProfile(firebaseUser);

    enforceSecurityRules(user, requiredRole);

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    throw new Error(normalizeError(error));
  }
};

/* ================= GOOGLE LOGIN ================= */

export const loginWithGoogle = async (requiredRole = null) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const firebaseUser = result.user;
    const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
    const snap = await getDoc(userRef);

    let user;

    if (snap.exists()) {
      user = buildUserObject(firebaseUser, snap.data());

      enforceSecurityRules(user, requiredRole);
    } else {
      if (!requiredRole) {
        throw new Error("Role required for first-time Google login.");
      }

      const payload = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: requiredRole,
        provider: "google",
        isActive: true,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(userRef, payload);

      user = buildUserObject(firebaseUser, payload);
    }

    setItem(LOCAL_USER_KEY, user);

    return user;
  } catch (error) {
    const cached = getCurrentUser();
    if (cached) return cached;

    throw new Error(normalizeError(error));
  }
};

/* ================= UPDATE PROFILE ================= */

export const updateUserProfile = async (uid, updates) => {
  try {
    const ref = doc(db, USER_COLLECTION, uid);

    await updateDoc(ref, {
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
    throw new Error(normalizeError(error));
  }
};

/* ================= LOGOUT ================= */

export const logout = async () => {
  await firebaseSignOut(auth);
  removeItem(LOCAL_USER_KEY);
};

/* ================= CACHE ================= */

export const getCurrentUser = () => {
  return getItem(LOCAL_USER_KEY);
};

/* ================= LISTENER ================= */

export const listenAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};