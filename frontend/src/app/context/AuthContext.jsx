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

export const AuthProvider = ({ children }) => {
  /* Load cached user first (Offline Support) */
  const cachedUser = getCurrentUser();

  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      try {
        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const profile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...snap.data(),
            };

            setUser(profile);
            localStorage.setItem("app_user", JSON.stringify(profile));
          }
        } else {
          setUser(null);
          localStorage.removeItem("app_user");
        }
      } catch (err) {
        /* ⭐ OFFLINE MODE */
        console.log("Offline mode detected");

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
    localStorage.removeItem("app_user");
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
