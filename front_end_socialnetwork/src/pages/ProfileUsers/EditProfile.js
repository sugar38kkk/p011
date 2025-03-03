import React, { useContext, useEffect, useState } from "react";

import {
    Box,
    Paper,
    Grid,
    Avatar,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { readUser, updateUser } from "~/services/userServices/userService";
import { CurentUser } from "~/MainRoutes";
import YesNoDialog from "../YesNoDialog";
import { useNavigate } from "react-router-dom";

const Profile = ({ Profiledata }) => {
    const { curentUserID, contextValue, setCurrentUser } = useContext(CurentUser);
    const [avatar, setAvatar] = useState([]);
    const [postContent, setPostContent] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(contextValue.curentUserProfile.avatar);
    const [selectedImage, setSelectedImage] = useState();
    const [yesno, setYesNo] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dateOfBirth: "",
        phone: "",
        gender: "",
        avatar: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //confirm

    //efect
    // Fetch user profile data from API
    useEffect(() => {
        readUser(curentUserID).then((data) => {
            if (data) {
                contextValue.setCurrentUserProfile(data);
            } else {
                alert("No profile");
            }
        });
    }, []);
    // Hàm xử lý file ảnh
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            setAvatarPreview(URL.createObjectURL(file));
            if (isImage) {
                setSelectedImage(file);
                console.log(file);
            } else setSelectedImage(avatarPreview);
        }
    };

    const handleUpdateProfile = async () => {
        // if (avatarPreview !== selectedImage) setSelectedImage(avatarPreview);
        const response = await updateUser(formData, selectedImage, curentUserID);
        if (response?.message !== "Server error") {
            setCurrentUser(null);
            alert("Success update profile");
            navigate("/settings");
        }
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center" sx={{ padding: 6, mt: 2 }}></Grid>
            <Box
                component={Paper}
                sx={{
                    maxWidth: 600,
                    mt: 0,
                    ml: 25,
                    justifySelf: "center",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#ffffff",
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    {/* Avatar */}
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Avatar
                            src={avatarPreview || contextValue.curentUserProfile?.avatar}
                            // src={avatarPreview}
                            alt={`${formData.username}`}
                            sx={{ width: 100, height: 100, margin: "0 auto" }}
                        />
                        <Button variant="text" component="label" sx={{ mt: 2 }}>
                            Thay đổi ảnh
                            {/* <input hidden accept="image/*" type="file" onChange={handleAvatarChange} /> */}
                            <input
                                hidden
                                accept="image/*"
                                id="file-input"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                        </Button>
                    </Grid>

                    {/* Form Fields */}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label="User name"
                            name="username"
                            variant="outlined"
                            value={formData.username || (formData.username = contextValue.curentUserProfile?.username)}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            disabled
                            InputProps={{
                                readOnly: true, // Không cho phép chỉnh sửa, giữ nguyên giao diện
                            }}
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={(formData.email = contextValue.curentUserProfile?.email)}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số Điện Thoại"
                            name="phone"
                            type="tel"
                            variant="outlined"
                            value={formData.phone || (formData.phone = contextValue.curentUserProfile?.phone)}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date Of Birth"
                            name="dateOfBirth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={
                                formData.dateOfBirth ||
                                (formData.dateOfBirth = contextValue.curentUserProfile?.dateOfBirth)
                            }
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender || (formData.gender = contextValue.curentUserProfile?.gender)}
                                onChange={handleChange}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => setYesNo(true)}
                        >
                            Cập Nhật Thông Tin
                        </Button>
                    </Grid>
                    <YesNoDialog
                        yesno={yesno}
                        setYesNo={setYesNo}
                        onConfirm={handleUpdateProfile}
                        title={"Xác nhận thay đổi"}
                        message={"Bạn có chắc chắn muốn cập nhật profile  không?"}
                    />
                </Grid>
            </Box>
        </>
    );
};

export default Profile;
