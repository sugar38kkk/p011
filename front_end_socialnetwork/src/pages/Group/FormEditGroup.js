import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Avatar,
} from "@mui/material";
import axios from "axios";
import { editGroup } from "~/services/groupServices/groupService";
import { useLocation, useNavigate } from "react-router-dom";

function FormEditGroup() {
    //data curent group
    const location = useLocation();
    const data = location?.state?.groupData;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("public");
    const [avatar, setAvatar] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Xử lý khi chọn ảnh
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Xử lý gửi dữ liệu
    const handleSend = async () => {
        const formData = new FormData();
        formData.append("groupId", data?._id);
        if (name) formData.append("name", name);
        if (description) formData.append("description", description);
        if (privacy) formData.append("privacy", privacy);
        if (avatar) formData.append("avatar", avatar);

        try {
            // Gọi API để gửi dữ liệu
            const response = await editGroup(formData).then((data) => {
                if (data) {
                    alert("Success!");
                    handleClose();
                } else console(data);
            });
        } catch (error) {
            console.log("Lỗi khi gửi dữ liệu", error);
        }
    };

    // Đóng Dialog

    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        navigate("/groups/mygroup");
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Nhập thông tin</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Hiển thị ảnh được chọn */}

                    <Avatar
                        src={previewImage || data?.avatar}
                        alt="Avatar Preview"
                        sx={{ width: "50px", height: "50px", justifySelf: "center", marginBottom: 2 }}
                    />

                    {/* Trường Name */}
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name || data?.name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />

                    {/* Trường Description */}
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={description || data?.description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                    />

                    {/* Select Privacy */}
                    <FormControl fullWidth>
                        <InputLabel id="privacy-label">Privacy</InputLabel>
                        <Select
                            labelId="privacy-label"
                            value={privacy}
                            label="Privacy"
                            onChange={(e) => setPrivacy(e.target.value)}
                        >
                            <MenuItem value="public">Public</MenuItem>
                            <MenuItem value="private">Private</MenuItem>
                            <MenuItem value="friends">Friends</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Upload Avatar */}
                    <Button variant="outlined" component="label" fullWidth>
                        Chọn ảnh
                        <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                {/* Nút Cancel */}
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                {/* Nút Send */}
                <Button onClick={handleSend} color="primary" variant="contained">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormEditGroup;
