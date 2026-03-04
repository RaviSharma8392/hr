import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlobalLoader from "../../shared/components/GlobalLoader";

export default function PrivateRoute({ allowedRoles }) {
  console.log(allowedRoles);

  const { user, isAuthenticated, loading } = useAuth();
  console.log(user);

  if (loading) return <GlobalLoader />;
  if (!isAuthenticated) return <Navigate to="/hr/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
