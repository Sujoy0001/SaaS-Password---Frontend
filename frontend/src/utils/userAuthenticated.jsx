import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../context/Auth";

/**
 * ✅ Protects routes that require authentication.
 * If not authenticated, redirects to /login.
 */
const ProtectRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * ✅ Prevents authenticated users from accessing routes like /login or /register.
 * If authenticated, redirects to /index.
 */
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/index" replace />;
  }
  return children;
};

export { ProtectRoute, PublicRoute };
