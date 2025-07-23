// src/components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // ✅ Strict check: both email AND name must match
    const isAdmin =
      decoded.email === "admin@gmail.com" &&
      decoded.name?.toLowerCase() === "admin";

    if (!isAdmin) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
