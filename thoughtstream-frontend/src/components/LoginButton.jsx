import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

function LoginButton() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const handleLogin = (response) => {
    const token = response.credential;

    // Save the token to localStorage or context
    localStorage.setItem("authToken", token);

    login(import.meta.env.VITE_VITE_JWT_TOKEN ,token); // Call the login function from AuthContext

    // Redirect to the dashboard
    navigate("/dashboard");
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleLogin} onError={handleError} />
    </div>
  );
}

export default LoginButton;