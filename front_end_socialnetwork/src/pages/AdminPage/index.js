import { Grid } from "@mui/material";
import AdminTable from "./AdminTable";
import Sidebar from "~/components/Layouts/Sidebar";
import { useState, useEffect } from "react";
import {
    adminDeleteUser,
    adminGetUser,
    adminUpdateUser,
    adminUpdateUserRole,
} from "~/services/AdminServices/adminUserService";
import { adminDeleteGroup, adminGetGroup } from "~/services/AdminServices/adminGroupService";
import AdminSelect from "./AdminSelect";
import { adminDeleteFriendships, adminGetFriendShips } from "~/services/AdminServices/adminFriendService";
import { adminDeletePost, adminGetPost } from "~/services/AdminServices/adminPostService";
import { adminDeleteMessage, adminGetMessage } from "~/services/AdminServices/adminMessageService";
import { adminDeleteNotifi, adminGetNotifi } from "~/services/AdminServices/notifiService";

function AdminPage() {
    const [route, setRoute] = useState(null);
    const [columns, setColumns] = useState([]);
    const [api, setAPI] = useState({});
    //api -------------------------------------------------------------------------------------------------------
    //user api
    const userAPI = {
        get: adminGetUser,
        put: adminUpdateUserRole,
        delete: adminDeleteUser,
    };
    //group
    const groupAPI = {
        get: adminGetGroup, // Lấy danh sách nhóm
        delete: adminDeleteGroup, // Xóa nhóm
    };

    //friend
    const friendAPI = {
        get: adminGetFriendShips, // Lấy danh sách bạn bè
        // post: addFriend, // Thêm bạn bè mới
        delete: adminDeleteFriendships, // Xóa bạn bè
    };
    // //message
    const messageAPI = {
        get: adminGetMessage, // Lấy danh sách tin nhắn
        delete: adminDeleteMessage, // Xóa tin nhắn
    };

    ///notifi
    const notifiAPI = {
        get: adminGetNotifi, // Lấy danh sách thông báo
        delete: adminDeleteNotifi, // Xóa thông báo
    };

    // //post
    const postAPI = {
        get: adminGetPost, // Lấy danh sách bài viết
        delete: adminDeletePost, // Xóa bài viết
    };

    ///columns---------------------------------------------------------------------------------------------------------
    const userColumns = [
        { field: "_id", label: "ID" }, // ID người dùng
        { field: "username", label: "Tên người dùng" }, // Tên người dùng
        { field: "email", label: "Email" }, // Email
        { field: "role", label: "Vai trò" }, // Vai trò (user, admin, ...)
        { field: "phone", label: "Số điện thoại" }, // Số điện thoại
        { field: "gender", label: "Giới tính" }, // Giới tính
        { field: "dateOfBirth", label: "Ngày sinh" }, // Ngày sinh
        // { field: "avatar", label: "Avatar" }, // Ảnh đại diện (nếu cần)
    ];

    const groupColumns = [
        { field: "_id", label: "ID Nhóm" },
        { field: "name", label: "Tên Nhóm" },
        { field: "members.length", label: "Thành viên" },
        // { field: "posts.length", label: "Số bài viết" },
        { field: "description", label: "Mô tả" },
    ];

    const friendColumns = [
        // { field: "_id", label: "id" }, // Truy cập vào recipient.username
        { field: "requester.username", label: "Người gửi" }, // Lấy username của requester
        { field: "requester.email", label: "Email người gửi" }, // Lấy email của requester
        { field: "recipient.username", label: "Người nhận" }, // Lấy username của recipient
        { field: "recipient.email", label: "Email người gửi" }, // Lấy email của requester
        { field: "status", label: "Trạng thái" }, // Hiển thị trạng thái
        { field: "createdAt", label: "Ngày tạo" }, // Hiển thị ngày tạo
    ];

    const messageColumns = [
        { field: "senderId.username", label: "Người gửi" }, // Tên người gửi
        { field: "senderId.email", label: "Email người gửi" }, // Email người gửi
        { field: "receiverId.username", label: "Người nhận" }, // Tên người nhận
        { field: "receiverId.email", label: "Email người nhận" }, // Email người nhận
        { field: "content", label: "Nội dung" }, // Nội dung tin nhắn
        { field: "createdAt", label: "Ngày gửi" }, // Ngày gửi tin nhắn
    ];
    //post
    const notifiColumns = [
        { field: "_id", label: "ID" }, // ID của thông báo
        // { field: "userId._id", label: "ID người dùng" }, // ID của người dùng
        { field: "userId.username", label: "Tên người dùng" }, // ID của người dùng
        // { field: "userId.email", label: "email" }, // ID của người dùng
        { field: "type", label: "Loại thông báo" }, // Loại thông báo
        // { field: "message", label: "Nội dung thông báo" }, // Nội dung của thông báo
        { field: "postId", label: "ID bài viết" }, // ID bài viết liên quan
        { field: "isRead", label: "Đã đọc" }, // Trạng thái đã đọc (true/false)
        // { field: "createdAt", label: "Ngày tạo" }, // Ngày tạo thông báo
    ];

    //post column
    const postColumns = [
        { field: "userId.username", label: "Người đăng" }, // Tên người đăng bài
        { field: "userId.email", label: "Email" }, // Email của người đăng
        { field: "content", label: "Nội dung" }, // Nội dung bài viết
        { field: "likes.length", label: "Lượt thích" }, // Tổng số lượt thích
        { field: "comments.length", label: "Số bình luận" }, // Tổng số bình luận
        { field: "visibility", label: "Chế độ hiển thị" }, // Chế độ hiển thị
        { field: "createdAt", label: "Ngày tạo" }, // Ngày tạo bài viết
    ];

    //reload
    const [reload, setReload] = useState(true);
    const hanldeReload = () => {
        setReload(!reload);
    };
    // Sử dụng useEffect để thay đổi columns khi type thay đổi
    useEffect(() => {
        switch (route) {
            case "user":
                setAPI(userAPI);
                setColumns(userColumns);
                break;
            case "group":
                setAPI(groupAPI);
                setColumns(groupColumns);
                break;
            case "friend":
                setColumns(friendColumns);
                break;
            case "message":
                setColumns(messageColumns);
                break;
            case "notifi":
                setColumns(notifiColumns);
                break;
            case "post":
                setAPI(postAPI);
                setColumns(postColumns);
                break;
            default:
                setColumns([]); // Nếu không có type phù hợp, set là mảng rỗng
        }
    }, [reload]); // Chạy lại khi type thay đổi

    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={8} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <AdminSelect hanldeReload={hanldeReload} setRoute={setRoute}></AdminSelect>{" "}
                {route === "user" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={userAPI} columns={userColumns} />
                )}
                {route === "group" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={groupAPI} columns={groupColumns} />
                )}
                {route === "friend" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={friendAPI} columns={friendColumns} />
                )}
                {route === "post" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={postAPI} columns={postColumns} />
                )}
                {route === "message" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={messageAPI} columns={messageColumns} />
                )}
                {route === "notifi" && (
                    <AdminTable hanldeReload={hanldeReload} reload={reload} api={notifiAPI} columns={notifiColumns} />
                )}
                {/* Thêm dòng này */}
            </Grid>
        </Grid>
    );
}

export default AdminPage;
