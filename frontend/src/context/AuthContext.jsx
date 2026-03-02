// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

import {
  getCurrentUser,
  logout as logoutService,
} from "../services/AuthService";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const USER_COLLECTION = "users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(true);

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

            setUser(profile);
            localStorage.setItem("app_user", JSON.stringify(profile));
          } else {
            // Profile missing → force logout
            await logoutService();
            setUser(null);
          }
        } catch (error) {
          console.error("Auth sync error:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

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
    isCompany: role === "company",
    isHR: role === "hr",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
