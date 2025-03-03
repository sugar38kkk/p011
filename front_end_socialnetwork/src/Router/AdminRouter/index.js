import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CurentUser } from "~/MainRoutes";
import auth from "~/services/authService/authHelper";
import { readUser } from "~/services/userServices/userService";

function AdminRoute({ children }) {
    const { contextValue, curentUserID, curentUserToken } = useContext(CurentUser);
    const [isrole, setRole] = useState("");
    const [isAdmin, SetAdmin] = useState();

    useEffect(() => {
        readUser(curentUserID).then((data) => {
            if (data) {
                console.log(data);
                setRole(data);
                if (data?.role == "admin") SetAdmin("admin");
            } else {
                alert("No role");
            }
        });
        console.log(curentUserID);
    }, [curentUserID]);
    console.log(isrole);
    if (auth.isAuthenticated() && auth.isAdmin("admin")) return children;
    return <Navigate to="/login" />;
}

export default AdminRoute;
