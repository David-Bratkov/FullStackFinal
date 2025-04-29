/* 
• Component to display app title, user’s name from context, and a Logout button to clear user’s
JWT via logout()
*/
import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Header(){
    const {user, logout} = useContext(AuthContext);
    return(
        <header className="header">
            <div className="header-left">
            <h1 className="header-title">Your Diary</h1>
            <span className="user-name">Hello {user.name}</span>
            </div>
            <button onClick={logout}>Logout</button>
        </header>
    );
}

export default Header;