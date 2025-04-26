import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute ({children}) {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate(); 

    return isAuthenticated ? children : navigate("/login");
}

export default PrivateRoute;