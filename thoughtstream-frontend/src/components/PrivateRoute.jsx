import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute ({children}) {
    const {isAuthenticated} = useContext(AuthContext);

    // console.log("isAuthenticated", isAuthenticated);
    const navigate = useNavigate(); 

    return isAuthenticated ? children : navigate("/");
}

export default PrivateRoute;