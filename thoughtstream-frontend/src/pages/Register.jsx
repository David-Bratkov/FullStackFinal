import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register()  {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const noEmptyFields = () => {
      return email.trim() !== "" && password.trim() !== "";
   }



   const handleBack = (e) => {
      e.preventDefault();
      navigate("/");
   };

   const handleRegister = async (e) => {
      e.preventDefault();
      if (!noEmptyFields()) {
         setError("Please fill in all fields.");
         // alert("Please fill in all fields.");
         return;
      }

      const userData = {
         email: email.trim(),
         password: password.trim(),
      };


      try {
         const returnValue = await registerUser(userData);

         console.log("User registered successfully:", returnValue);

         setError("Registration Successful! You can now log in.");




      }
      catch(error) {
         if(error.status === 409) {
            setError("Email already exists. Please use a different email.");
            // alert("Email already exists. Please use a different email.");
            return;
         }
         console.error("Error registering user:", error);
      }

      
   };

   return (
      <form>
         <label>{error}</label>
         <div className="local-register">
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
               <button onClick={handleBack}>Back</button>
               <button onClick={handleRegister}>Register</button>
            </div>
         </div>
      </form>
   );
}

export default Register;