// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  getCurrentUser,
  logout as logoutService,
} from "../services/auth/AuthService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const USER_COLLECTION = "users";

export const AuthProvider = ({ children }) => {
  // 1. Instantly load cached user from localStorage
  const cachedUser = getCurrentUser();
  const [user, setUser] = useState(cachedUser);

  // 2. CRITICAL FIX: If we have a cached user, DO NOT block the UI.
  // Let the app render instantly while Firebase syncs in the background.
  const [loading, setLoading] = useState(!cachedUser);

  /* ---------------------------------------
     Sync Firebase Auth with Firestore
  ---------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, USER_COLLECTION, firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const profile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...snap.data(),
            };

            // Update state silently with fresh database data
            setUser(profile);
            localStorage.setItem("app_user", JSON.stringify(profile));
          } else {
            // Profile missing in DB → force logout
            await logoutService();
            setUser(null);
            localStorage.removeItem("app_user");
          }
        } catch (error) {
          console.error("Auth sync error (Likely offline):", error);
          // CRITICAL FIX: Do NOT set user to null here!
          // If the network is down, we want to keep using the cached user from localStorage.
        }
      } else {
        // Firebase explicitly confirmed the user is logged out
        setUser(null);
        localStorage.removeItem("app_user");
      }

      // Sync complete, release loading lock (if it was even locked)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ---------------------------------------
     Logout Wrapper
  ---------------------------------------- */
  const logout = async () => {
    await logoutService();
    setUser(null);
    localStorage.removeItem("app_user");
  };

  /* ---------------------------------------
     Role Helpers
  ---------------------------------------- */
  const role = user?.role || null;

  const value = {
    user,
    role,
    loading,
    logout,
    isAuthenticated: !!user,
    isCandidate: role === "candidate",
    isCompany: role === "company", // Or 'company_admin' based on your App.js
    isHR: role === "hr",
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Because loading is false immediately if localStorage has data, 
        the app renders instantly with zero blank screens. 
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
