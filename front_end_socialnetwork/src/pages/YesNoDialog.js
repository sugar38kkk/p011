import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
///compoent rôot
///yesno dialog
//   const [yesno, setYesNo] = useState(false);
//   const [currentAction, setCurrentAction] = useState(null);
//   const handleOpenPopup = (action) => {
//       setCurrentAction(action); // Lưu hành động hiện tại
//       setYesNo(true); // Mở popup
//   };
//   // Hàm xác nhận hành động được gọi từ popup

//   const handleConfirmAction = () => {
//       if (currentAction === "delete") {
//           // Logic xử lý khi xác nhận xóa
//           alert("Đã xóa thành công!");
//       } else if (currentAction === "update") {
//           // Logic xử lý khi xác nhận cập nhật
//           alert("Đã cập nhật thành công!");
//       }
//   };
{
    /*            <Button variant="contained" color="error" onClick={() => handleOpenPopup("delete")}>
                Delete
            </Button> 
            <YesNoDialog
yesno={yesno}
setYesNo={setYesNo}
onConfirm={handleConfirmAction}
title={currentAction === "delete" ? "Xác nhận xóa" : "Xác nhận cập nhật"}
message={
    currentAction === "delete"
        ? "Bạn có chắc chắn muốn xóa mục này không?"
        : "Bạn có chắc chắn muốn cập nhật mục này không?"
}
/> 
*/
    // nomal action
    // const [yesno, setYesNo] = useState(false);
    // <Button variant="contained" color="error" onClick={() => setYesNo(true)}>
    // Delete
    // </Button>
    //<YesNoDialog yesno={yesno} setYesNo={setYesNo} onConfirm={handleDeleteFriend} title={"Confirm action"} message={"Do you really want to do this?"} />
}
const YesNoDialog = ({
    yesno,
    setYesNo,
    onConfirm,
    title = "Xác nhận hành động",
    message = "Bạn có chắc chắn muốn thực hiện hành động này?",
}) => {
    const handleClose = () => {
        setYesNo(false); // Đóng popup khi chọn No hoặc đóng
    };

    const handleYes = () => {
        onConfirm(); // Thực hiện hành động khi chọn Yes
        setYesNo(false); // Đóng popup sau khi xác nhận
    };

    return (
        <Dialog
            open={yesno}
            onClose={handleClose}
            aria-labelledby="yesno-dialog-title"
            aria-describedby="yesno-dialog-description"
        >
            <DialogTitle id="yesno-dialog-title">{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    No
                </Button>
                <Button onClick={handleYes} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default YesNoDialog;
