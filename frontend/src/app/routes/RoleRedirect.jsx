import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlobalLoader from "../../shared/components/GlobalLoader";

export default function RoleRedirect() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <GlobalLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  if (user?.role === "hr") {
    return <Navigate to="/hr" replace />;
  }

  if (user?.role === "candidate") {
    return <Navigate to="/candidate" replace />;
  }

  return <Navigate to="/welcome" replace />;
}
