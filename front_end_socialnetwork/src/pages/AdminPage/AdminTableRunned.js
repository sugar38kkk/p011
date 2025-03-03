import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel,
    Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EditUserDialog from "~/pages/ProfileUsers/EditProfile"; // Dialog chỉnh sửa
import AdminSelect from "./AdminSelect";
import { adminDeleteUser } from "~/services/AdminServices/adminUserService";
import YesNoDialog from "../YesNoDialog";

const AdminTable = ({ api, columns, reload, hanldeReload }) => {
    const [data, setData] = useState([]);
    const [yesno, setYesNo] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [curentID, setCurentID] = useState(null);

    //    // Hàm xử lý xóa
    const handleDelete = async (curentID) => {
        // Gọi API xóa
        await api.delete(curentID).then((data) => {
            hanldeReload();
        });
    };
    // const handleOpenPopup = (action) => {
    //     setCurrentAction(action); // Lưu hành động hiện tại
    //     setYesNo(true); // Mở popup
    // };
    // const handleConfirmAction = () => {
    //     if (currentAction === "delete") {
    //         // Logic xử lý khi xác nhận xóa
    //         handleDelete(curentID);
    //         // alert("Đã xóa thành công!");
    //     } else if (currentAction === "update") {
    //         // Logic xử lý khi xác nhận cập nhật
    //         alert("Đã cập nhật thành công!");
    //     }
    // };
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
        try {
            const response = await api.get(); // Gọi API lấy dữ liệu người dùng
            setData(response);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reload]);

    // Hàm xử lý chỉnh sửa
    const handleEdit = (user, role) => {
        // Mở dialog chỉnh sửa
        if (role === "user") api.put(user, "admin");
        if (role === "admin") api.put(user, "user");
        console.log("Chỉnh sửa:", user);
        hanldeReload();
    };
    //get field
    const getNestedValue = (object, path) => {
        return path.split(".").reduce((o, key) => (o && o[key] !== undefined ? o[key] : ""), object);
    };

    ///sort feature
    // Thêm state để theo dõi cột nào đang được sắp xếp và theo thứ tự nào
    const [order, setOrder] = useState("asc"); // asc: tăng dần, desc: giảm dần
    const [orderBy, setOrderBy] = useState(""); // Cột hiện tại được sắp xếp

    // Hàm xử lý khi nhấn vào tiêu đề cột
    const handleSortRequest = (columnField) => {
        const isAsc = orderBy === columnField && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(columnField);
    };

    // Hàm sắp xếp dữ liệu dựa trên cột và thứ tự
    const sortedData = data.sort((a, b) => {
        if (!orderBy) return 0; // Không sắp xếp nếu chưa chọn cột

        const aValue = a[orderBy]?.toString().toLowerCase() || "";
        const bValue = b[orderBy]?.toString().toLowerCase() || "";

        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
    });
    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
                Manager
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            {/* {columns.map((column) => (
                                <TableCell key={column?.field}>{column?.label}</TableCell>
                            ))} */}
                            {columns.map((column) => (
                                <TableCell key={column.field}>
                                    <TableSortLabel
                                        active={orderBy === column.field}
                                        direction={orderBy === column.field ? order : "asc"}
                                        onClick={() => handleSortRequest(column.field)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            {api.put && <TableCell>Chỉnh sửa</TableCell>}
                            <TableCell>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.field}>
                                        {getNestedValue(item, column.field)}
                                        {column.field === "isRead" && item.isRead === true && "readed"}
                                        {column.field === "isRead" && item.isRead === false && "non-readed"}
                                    </TableCell>
                                ))}

                                {api.put && (
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(item._id, item?.role)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>{" "}
            {/* <YesNoDialog
                yesno={yesno}
                setYesNo={setYesNo}
                onConfirm={handleConfirmAction()}
                title={currentAction === "delete" ? "Xác nhận xóa" : "Xác nhận cập nhật"}
                message={
                    currentAction === "delete"
                        ? "Bạn có chắc chắn muốn xóa không?"
                        : "Bạn có chắc chắn muốn cập nhật không?"
                }
            /> */}
        </Paper>
    );
};

export default AdminTable;
