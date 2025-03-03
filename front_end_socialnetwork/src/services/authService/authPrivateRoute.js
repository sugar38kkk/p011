import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import auth from "./authHelper";

const PrivateRoute = ({ children }) => {
    console.log("private " + auth.isAuthenticated());
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
