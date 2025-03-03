import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    TextField,
    Grid,
    Container,
    Typography,
    CssBaseline,
    Button,
    Icon,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";

import { API_BASE_URL } from "~/config/apiConfig";
import { createUser } from "~/services/userServices/userService";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();
    const clickSubmit = () => {
        createUser(formData).then((data) => {
            if (data) {
                setFormData({ ...formData, error: data.message });
                alert("create success");
                // Navigate after 1 second if successful
                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }, 1000);
            } else {
                setFormData({ ...formData, error: "", open: true });
            }
        });

        setTimeout(() => {
            navigate("/login");
        }, 500);
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Destructure formData for easy access
        const { username, email, password, confirmPassword, phone, dateOfBirth, gender } = formData;

        // Check if any required field is empty
        if (!username || !email || !password || !confirmPassword || !dateOfBirth || !gender) {
            alert("Please fill in all required fields.");
            return;
        }

        // Check if password matches confirmPassword
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Check if the user is at least 18 years old
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (age < 18 || (age === 18 && monthDiff < 0)) {
            alert("You must be at least 18 years old to register.");
            return;
        }
        // If all checks pass, proceed to submit
        clickSubmit();
    };
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: { xs: "90%", sm: 500 },
                padding: 4,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                margin: "0 auto",
                mt: 5,
                mb: 8,
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
                <CssBaseline />
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Register
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Username"
                                name="username"
                                autoComplete="fname"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="dateOfBirth"
                                label="Date of birth"
                                name="dateOfBirth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Orther</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {formData.error && (
                        <Typography component="p" color="error" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                            <Icon color="error" sx={{ mr: 1 }} />
                            {formData.error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </form>

                <Dialog open={formData.open} disableBackdropClick={true}>
                    <DialogTitle>Tài khoản mới</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Tài khoản của bạn đã được tạo thành công.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/login">
                            <Button color="primary" autoFocus variant="contained">
                                Đăng Nhập
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
