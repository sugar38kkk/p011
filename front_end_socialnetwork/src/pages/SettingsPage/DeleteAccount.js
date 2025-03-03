import React, { useContext, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "~/services/userServices/userService";
import { CurentUser } from "~/MainRoutes";

function DeleteAccountDialog({ onDeleteAccount }) {
    const { curentUserID } = useContext(CurentUser);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    // Hàm đóng Dialog và quay lại trang trước đó
    const handleClose = () => {
        setOpen(false);
        navigate(-1); // Quay lại trang trước đó
    };

    // Hàm gọi API xóa tài khoản
    const handleDelete = () => {
        deleteUser(curentUserID); // Gọi hàm xóa tài khoản
        setOpen(false);
        navigate("/"); // Chuyển về trang chủ sau khi xóa
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-account-dialog-title"
            aria-describedby="delete-account-dialog-description"
        >
            <DialogTitle id="delete-account-dialog-title">Xóa Tài Khoản</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-account-dialog-description">
                    Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể thu hồi lại được.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleDelete} color="error" variant="contained">
                    Xác Nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAccountDialog;
