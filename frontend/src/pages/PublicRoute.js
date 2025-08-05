// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children, redirectTo = "/" }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        // Token is valid, user already logged in — redirect them
        return <Navigate to={redirectTo} />;
      }
    } catch (err) {
      // Invalid token — proceed to public page
      localStorage.removeItem("token");
    }
  }

  // No valid token — allow access
  return children;
};

export default PublicRoute;
