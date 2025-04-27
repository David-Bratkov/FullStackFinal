import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext
import axios from "axios";

function LoginButton() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const handleLogin = async (response) => {

    const res = await axios.post(
      "http://localhost:5000/api/auth/google",
      response,
    )

    console.log("DEBUG Login response:", res.data);

    login(res.data.token, res.data.user);

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