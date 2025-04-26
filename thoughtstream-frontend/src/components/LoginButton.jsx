/*
Login button with oauth icons aswell as local logins
*/
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
function LoginButton(){
   const handleLogin = ( response) =>{
     const token = response.credential;
   };
   return(
    <div>
        <GoogleLogin onSuccess={handleLogin}/>
    </div>
   );
}

export default LoginButton;