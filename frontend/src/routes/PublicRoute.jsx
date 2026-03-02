import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const UserAuthRoute = ({ children }) => {
  //   const { currentUser, loading } = useAuth();

  // Show nothing while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm">Checking authentication...</p>
      </div>
    );
  }

  // If not logged in → redirect
  if (!currentUser) {
    return <Navigate to="/company-login" replace />;
  }

  // If logged in → allow access
  return children;
};

export default UserAuthRoute;
