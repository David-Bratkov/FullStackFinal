import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LocalLogin({ onLogin }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleLogin = (e) => {
      e.preventDefault();
      if (email.trim() === "" || password.trim() === "") {
         setError("Please fill in all fields.");
         return;
      }
   };

   const handleRegister = (e) => {
      e.preventDefault();
      setError("");
      navigate("/register");
   };

   return (
      <form>
         <div className="local-login">
            <label className="error-label">{error}</label>
            <input
            className="content-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
            <input
            className="content-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            />
            <div>
               <button onClick={handleLogin}>Login</button>
               <button onClick={handleRegister}>Register</button>
            </div>
         </div>
      </form>
   );
}

export default LocalLogin;