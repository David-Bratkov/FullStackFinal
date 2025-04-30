/*
This component is part of the login view <Login /> that triggers the Google OAuth flow
*/
import React from 'react';
import LoginButton from '../components/LoginButton';
import LocalLogin from '../components/LocalLogin';

function Login(){
    return(
        <div className='login-box'>
            <h2 className='login-title'>App Login</h2>
            <LocalLogin/>
            <LoginButton/>
        </div>
    )
}
export default Login;