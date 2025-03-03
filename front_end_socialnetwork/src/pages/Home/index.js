import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";

import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";

const HomePage = ({ login }) => {
    const [isLogin, setIsLogin] = useState(login);

    return (
        <>
            <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left" }}>
                        Welcome to Our Site
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => setIsLogin(true)} sx={{ px: 4 }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setIsLogin(false)} sx={{ px: 4 }}>
                            Register
                        </Button>
                    </Box>
                </Box>
                {isLogin ? <Login /> : <Register />}
            </>
        </>
    );
};

export default HomePage;
