import { Navigate } from "react-router-dom";
import auth from "~/services/authService/authHelper";

function PrivateRoute({ children }) {
    if (auth.isAuthenticated()) return children;
    return <Navigate to="/login" />;
}

export default PrivateRoute;
