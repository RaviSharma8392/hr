import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../app/context/AuthContext";
import GlobalLoader from "../../shared/components/GlobalLoader";
import HRMHomepage from "../../modules/public/pages/HRMHomepage";

export default function RoleRedirect() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <GlobalLoader />;

  if (!isAuthenticated) {
    return <HRMHomepage />;
  }
  switch (user?.role) {
    case "hr":
      return <Navigate to="/hr" replace />;

    case "candidate":
      return <Navigate to="/candidate/dashboard" replace />;

    case "admin":
      return <Navigate to="/admin" replace />;

    default:
      return <Navigate to="/" replace />;
  }
}
