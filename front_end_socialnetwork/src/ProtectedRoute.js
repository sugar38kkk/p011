import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CurentUser } from "./MainRoutes";

// Component bảo vệ route dựa trên role
const ProtectedRoute = ({ allowedRoles }) => {
    const { curentUserProfile } = useContext(CurentUser); // Lấy thông tin user từ localStorage
    console.log(curentUserProfile);
    // Kiểm tra role
    if (!curentUserProfile || !allowedRoles.includes(curentUserProfile.role)) {
        return <Navigate to="/home" />; // Điều hướng về login nếu không có quyền
    }

    return <Outlet />; // Render các component con
};

export default ProtectedRoute;
