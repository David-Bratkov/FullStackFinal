/* 
• Component to display app title, user’s name from context, and a Logout button to clear user’s
JWT via logout()
*/
import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

function Header(){
    const {user, logout} = useContext(AuthContext);
    return(
        <header>
            <h1>Header</h1>
            <span>Hello {user.name}</span>
            <button onClick={logout}>Logout</button>
        </header>
    );
}

export default Header;