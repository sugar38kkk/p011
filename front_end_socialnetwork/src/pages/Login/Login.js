import {
    TextField,
    Grid,
    Icon,
    Card,
    FormHelperText,
    Container,
    Typography,
    CssBaseline,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";

import { login, loginUser } from "~/services/authService/authService";
import { useState, useEffect, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "~/services/authService/authHelper";
import { CurentUser } from "~/MainRoutes";
import { getInfo, readUser, saveInfo } from "~/services/userServices/userService";
import Newsfeed from "../NewFeed";
export default function Login(props) {
    const { curentUser, setCurrentUser, curentUserProfile, setCurrentUserProfile, curentUserID, curentUserToken } =
        useContext(CurentUser);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false,
    });

    const clickSubmit = () => {
        const user = { email: values.email || undefined, password: values.password || undefined };

        login(user).then((data) => {
            // readUser(data._id).then((data1) => {
            //     if (data1) {
            //         // Chỉ đặt error khi có lỗi từ server, không hiển thị mật khẩu
            //         setCurrentUserProfile(JSON.stringify(data1));
            //         console.log("set curent info ");
            //     } else {
            //         alert("No profile !");
            //     }
            // });
            if (data.message) {
                // Chỉ đặt error khi có lỗi từ server, không hiển thị mật khẩu
                setValues({ ...values, error: data.message });
            } else {
                // Chuyển hướng khi đăng nhập thành công
                auth.authenticate(data, () => {
                    setValues({ ...values, error: "", redirectToReferrer: true });
                    navigate("/home");
                });
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value, error: "" }); // Reset lỗi khi người dùng thay đổi thông tin
    };

    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/home" } };
    const { redirectToReferrer } = values;

    // if (redirectToReferrer) {
    //     return (
    //         <>
    //             {" "}
    //             <Navigate to={"/home"} />
    //             <Newsfeed />
    //         </>
    //     );
    // }
    // const navigate = useNavigate()
    // if (redirectToReferrer) {
    //     return {navigate('/home');
    //         window.reaload()
    //     };
    // }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "0vh",
                // backgroundColor: "#f0f2f5",
                padding: 2,
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: "#1877f2",
                        fontWeight: "bold",
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        mb: 1,
                    }}
                >
                    Social
                </Typography>
                <Typography variant="body1" sx={{ color: "#606770", fontSize: 18 }}>
                    giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{
                    width: 400,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                    mt: 5,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#ffffff",
                }}
            >
                <TextField
                    label="Email hoặc số điện thoại"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                {values.error && (
                    <FormHelperText error sx={{ textAlign: "center", mb: 2 }}>
                        {values.error}
                    </FormHelperText>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={clickSubmit}
                    fullWidth
                    sx={{
                        backgroundColor: "#1877f2",
                        textTransform: "none",
                        fontSize: 18,
                        fontWeight: "bold",
                        ":hover": { backgroundColor: "#166fe5" },
                    }}
                >
                    Đăng nhập
                </Button>
            </Box>
        </Box>
    );
}
