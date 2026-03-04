import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlobalLoader from "../../shared/components/GlobalLoader";

export default function PrivateRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <GlobalLoader />;

  /* Not logged in */
  if (!isAuthenticated) {
    // Redirect based on URL prefix
    if (location.pathname.startsWith("/candidate")) {
      return <Navigate to="/candidate/login" replace />;
    }

    return <Navigate to="/hr/login" replace />;
  }

  /* Role not allowed */
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
