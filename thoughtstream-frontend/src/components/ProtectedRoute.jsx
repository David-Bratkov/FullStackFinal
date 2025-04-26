// File: components/ProtectedRoute.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
* Component to wrap around any route that should only be
* accessible to authenticated users. If the user is not logged in,
* i.e., no JWT in context, it redirects to /login.
*
* @param {JSX.Element} children - Component to render if authenticated
* @returns {JSX.Element} - Either the child component or a redirect
*/
export default function ProtectedRoute({ children }) {
   const { isAuthenticated } = useContext(AuthContext);
   const navigate = useNavigate(); 
   if (!isAuthenticated) {
      // Not logged in; redirect to login page
      navigate("/login");

   }

   // Logged in; allow access to the route
   return children;
}