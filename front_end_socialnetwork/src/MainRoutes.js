import React, { useState, useEffect, createContext, useMemo } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { createTheme, GlobalStyles, ThemeProvider, useMediaQuery } from "@mui/material";
import auth from "./services/authService/authHelper";

import { readUser } from "./services/userServices/userService";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import ProtectedRoute from "./ProtectedRoute";

// Import pages
import HomePage from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Newsfeed from "./pages/NewFeed";
import Profile from "./pages/ProfileUsers";
import SettingsPage from "./pages/SettingsPage";
import FriendPage from "./pages/Friends/FriendPage";
import EditProfile from "./pages/ProfileUsers/EditProfile";
import DeleteAccountDialog from "./pages/SettingsPage/DeleteAccount";
import GroupPage from "./pages/Group/GroupPage";
import CreateGroup from "./pages/Group/CreateGroup";
import ListGroup from "./pages/Group/ListGroup";
import ListGroupAll from "./pages/Group/ListGroupAll";
import FormEditGroup from "./pages/Group/FormEditGroup";
import DetailGroup from "./pages/Group/DetailGroup";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PublicRoute from "./Router/PublicRouter";
import PrivateRoute from "./Router/PrivateRouter";
import PageNotFound from "./pages/Pagenotfound";
import AdminRoute from "./Router/AdminRouter";
import AdminTable from "./pages/AdminPage/AdminTable";

export const CurentUser = createContext();

const MainRoutes = () => {
    const [curentUser, setCurrentUser] = useState();
    const [curentUserProfile, setCurrentUserProfile] = useState();
    const curentUserID = auth.isAuthenticated()?.userId;
    const curentUserToken = auth.isAuthenticated()?.token;
    const contextValue = useMemo(
        () => ({
            curentUser,
            setCurrentUser,
            curentUserProfile,
            setCurrentUserProfile,
        }),
        [curentUser, curentUserProfile],
    );
    useEffect(() => {
        if (curentUserID) {
            readUser(curentUserID).then((data) => {
                if (data) {
                    setCurrentUserProfile(data);
                } else {
                    console.log("No profile!");
                }
            });
        }
    }, [curentUserID, curentUser]);
    // Theme settings
    const [themeColor, setThemeColor] = useState(sessionStorage.getItem("themeColor") || "#2196f3");
    const [themeSecondary, setThemeSecondary] = useState(sessionStorage.getItem("themeSecondary") || "#FFB347");
    const [darkMode, setDarkMode] = useState(sessionStorage.getItem("darkMode") === "true");

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: themeColor },
            secondary: { main: themeSecondary },
        },
    });
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Xác định kích thước màn hình mobile
    useEffect(() => {
        sessionStorage.setItem("themeColor", themeColor);
        sessionStorage.setItem("themeSecondary", themeSecondary);
        sessionStorage.setItem("darkMode", darkMode);
    }, [themeColor, themeSecondary, darkMode]);
    //router
    const routesArray = [
        ///public routes
        {
            path: "*",
            element: (
                <PublicRoute>
                    <HomePage login={true} />
                </PublicRoute>
            ),
        },
        {
            path: "/login",
            element: (
                <PublicRoute>
                    <HomePage login={true} />
                </PublicRoute>
            ),
        },
        {
            path: "/register",
            element: (
                <PublicRoute>
                    <HomePage login={false} />
                </PublicRoute>
            ),
        },

        ///private routes
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/home",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/newsfeed",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/home",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/newsfeed",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/home",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/newsfeed",
            element: (
                <PrivateRoute>
                    <Newsfeed />
                </PrivateRoute>
            ),
        },
        {
            path: "/profile/:userId",
            element: (
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            ),
        },
        {
            path: "/friends",
            element: (
                <PrivateRoute>
                    <FriendPage />
                </PrivateRoute>
            ),
        },
        //group 6x
        {
            path: "/groups",
            element: (
                <PrivateRoute>
                    <GroupPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/groups/mygroup",
            element: (
                <PrivateRoute>
                    <ListGroup />
                </PrivateRoute>
            ),
        },
        {
            path: "/groups/explore",
            element: (
                <PrivateRoute>
                    <ListGroupAll />
                </PrivateRoute>
            ),
        },
        {
            path: "/groups/create",
            element: (
                <PrivateRoute>
                    <CreateGroup />
                </PrivateRoute>
            ),
        },
        {
            path: "/groups/update",
            element: (
                <PrivateRoute>
                    <FormEditGroup />
                </PrivateRoute>
            ),
        },
        {
            path: "/groups/:id",
            element: (
                <PrivateRoute>
                    <DetailGroup />
                </PrivateRoute>
            ),
        },
        //settings
        {
            path: "/settings",
            element: (
                <PrivateRoute>
                    <SettingsPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/settings/editprofile",
            element: (
                <PrivateRoute>
                    <EditProfile />
                </PrivateRoute>
            ),
        },
        {
            path: "/settings/deleteaccount",
            element: (
                <PrivateRoute>
                    <DeleteAccountDialog />
                </PrivateRoute>
            ),
        },
        {
            path: "*",
            element: (
                <PrivateRoute>
                    <PageNotFound />
                </PrivateRoute>
            ),
        },
        //admin rotes
        {
            path: "/admin",
            element: (
                <AdminRoute>
                    <AdminPage />
                </AdminRoute>
            ),
        },
        // {
        //     path: "/admin/user",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="user" />
        //         </AdminRoute>
        //     ),
        // },
        // {
        //     path: "/admin/group",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="group" />
        //         </AdminRoute>
        //     ),
        // },
        // {
        //     path: "/admin/friend",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="friend" />
        //         </AdminRoute>
        //     ),
        // },
        // {
        //     path: "/admin/message",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="message" />
        //         </AdminRoute>
        //     ),
        // },
        // {
        //     path: "/admin/notifi",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="notifi" />
        //         </AdminRoute>
        //     ),
        // },
        // {
        //     path: "/admin/post",
        //     element: (
        //         <AdminRoute>
        //             <AdminPage type="post" />
        //         </AdminRoute>
        //     ),
        // },
    ];
    const routesElement = useRoutes(routesArray);
    return (
        <CurentUser.Provider
            value={{
                contextValue,
                curentUserID,
                setCurrentUser,
                curentUserToken,
                themeColor,
                setThemeColor,
                darkMode,
                setDarkMode,
                themeSecondary,
                setThemeSecondary,
                isMobile,
            }}
        >
            <ThemeProvider theme={theme}>
                <GlobalStyles styles={{ body: { overflowY: "scroll" } }} />

                {auth.isAuthenticated() && <DefaultLayout />}
                <>{routesElement}</>
            </ThemeProvider>
        </CurentUser.Provider>
    );
};

export default MainRoutes;
