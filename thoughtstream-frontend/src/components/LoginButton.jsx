import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = (response) => {
    console.log("Google Login Success:", response);
    const token = response.credential;

    // Save the token to localStorage or context
    localStorage.setItem("authToken", token);

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