import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebase";

import {
  getCurrentUser,
  logout as logoutService,
} from "../services/auth/AuthService";

import {
  setItem,
  removeItem,
} from "../services/localStorage/localStorage.service";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const cachedUser = getCurrentUser();

  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!mounted) return;

      try {
        if (firebaseUser) {
          if (!firebaseUser.emailVerified) {
            setUser(null);
            removeItem("app_user");
            setLoading(false);
            return;
          }

          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (!snap.exists()) {
            throw new Error("Profile missing");
          }

          const profile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            ...snap.data(),
          };

          if (!profile.isActive) {
            setUser(null);
            removeItem("app_user");
            setLoading(false);
            return;
          }

          setUser(profile);
          setItem("app_user", profile);
        } else {
          setUser(null);
          removeItem("app_user");
        }
      } catch {
        const cached = getCurrentUser();
        setUser(cached);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  const role = user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        logout,
        isAuthenticated: !!user,
        isHR: role === "hr",
        isCandidate: role === "candidate",
        isAdmin: role === "admin",
      }}>
      {children}
    </AuthContext.Provider>
  );
};
