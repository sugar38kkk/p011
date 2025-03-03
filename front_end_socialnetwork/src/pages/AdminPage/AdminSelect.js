import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const AdminSelect = ({ hanldeReload, setRoute }) => {
    const [selectedOption, setSelectedOption] = useState(""); // Lưu lựa chọn

    // Xử lý khi thay đổi lựa chọn
    const handleChange = (event) => {
        const value = event.target.value;
        setRoute(value);
        hanldeReload(); // Điều hướng tới trang tương ứng
    };

    return (
        <Box sx={{ width: 300, margin: "0 auto", textAlign: "center", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Chọn danh mục quản lý
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="admin-select-label">Danh mục</InputLabel>
                <Select labelId="admin-select-label" value={selectedOption} onChange={handleChange} label="Danh mục">
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="group">Group</MenuItem>
                    <MenuItem value="friend">Friend</MenuItem>
                    <MenuItem value="post">Post</MenuItem>
                    <MenuItem value="notifi">Notifi</MenuItem>
                    <MenuItem value="message">Message</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default AdminSelect;
