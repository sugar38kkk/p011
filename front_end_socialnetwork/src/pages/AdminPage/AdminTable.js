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
    TextField,
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
    const [searchTerm, setSearchTerm] = useState(""); // State lưu từ khóa tìm kiếm
    // Hàm xử lý khi nhấn vào tiêu đề cột
    // Hàm xử lý sắp xếp
    const handleSortRequest = (columnField) => {
        const isAsc = orderBy === columnField && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(columnField);
    };
    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data.filter((item) =>
        columns.some((column) => {
            const value = getNestedValue(item, column.field)?.toString().toLowerCase() || "";
            return value.includes(searchTerm.toLowerCase());
        }),
    );
    // Hàm sắp xếp dữ liệu dựa trên cột và thứ tự
    // Sắp xếp dữ liệu đã lọc
    const sortedData = [...filteredData].sort((a, b) => {
        if (!orderBy) return 0; // Không sắp xếp nếu chưa chọn cột

        const aValue = getNestedValue(a, orderBy)?.toString().toLowerCase() || "";
        const bValue = getNestedValue(b, orderBy)?.toString().toLowerCase() || "";

        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
                Manager
            </Typography>{" "}
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
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
                        {sortedData.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.field}>{getNestedValue(item, column.field)}</TableCell>
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
