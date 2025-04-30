import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function PrivateRoute ({children}) {
    const {isAuthenticated} = useContext(AuthContext);

    // console.log("isAuthenticated", isAuthenticated);
    const navigate = useNavigate();
    if (!isAuthenticated) {
        console.log("User is not authenticated, redirecting to login");
        return <Navigate to="/" replace />;
    } 

    return children;
}

export default PrivateRoute;