import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";

function PrivateRoute ({children}) {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to ="/" />;
}

export default PrivateRoute;