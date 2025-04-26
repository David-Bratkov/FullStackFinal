/*
This component is part of the login view <Login /> that triggers the Google OAuth flow
*/
import React from 'react';
import LoginButton from '../components/LoginButton';

function Login(){
    return(
        <div>
            <h2>Login With Google</h2>
            <LoginButton/>
        </div>
    )
}
export default Login;