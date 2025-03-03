import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { CurentUser } from "~/MainRoutes";
import {
    acceptFriendRequest,
    getListFriend,
    getListFriendRequest,
    rejectFriendRequest,
} from "~/services/friendServices/friendService";

const FriendRequestCard = ({ request, onAccept, onDeny }) => {
    return (
        <Box
            sx={{
                width: 200,
                minHeight: 225, // Đặt chiều cao tối thiểu để đồng nhất
                border: "1px solid #ddd",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                textAlign: "center",
                mb: 2,
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Đẩy các nút xuống cuối thẻ
            }}
        >
            <Box>
                <Avatar
                    src={request.requester.avatar}
                    alt={request?.username}
                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                />
                <Typography variant="body1" fontWeight="600" mt={1}>
                    {request?.requester.username}
                </Typography>
                {request?.status && (
                    <Typography variant="caption" color="textSecondary">
                        {request?.status}
                        <br />
                        <Typography variant="caption" color="textSecondary">
                            {request?.requester.email}
                        </Typography>
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onAccept(request?.requester._id)}
                    sx={{ textTransform: "none" }}
                >
                    Xác nhận
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeny(request?.requester)}
                    sx={{ textTransform: "none" }}
                >
                    Xóa
                </Button>
            </Box>
        </Box>
    );
};

const FriendRequestList = ({ requests, handleAccept, handleDeny }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                List Request
            </Typography>
            <Grid container spacing={2}>
                {requests
                    .filter((request) => request.status !== "accepted")
                    .map((request) => (
                        <Grid item key={request._id}>
                            <FriendRequestCard request={request} onAccept={handleAccept} onDeny={handleDeny} />
                        </Grid>
                    ))}
            </Grid>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => console.log("View all clicked")}
            >
                {`You have ${requests.length}  request`}
            </Typography>
        </Box>
    );
};

// Component chính
const FriendRequest = () => {
    const [reload, setReload] = useState(false);
    const handleAccept = (id) => {
        try {
            acceptFriendRequest(id).then((result) => {
                if (result) {
                    alert(result.message);
                    setReload(!reload);
                } else {
                    alert(result.message);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeny = (id) => {
        rejectFriendRequest(id);
    };

    //caall api getList
    const [data, setData] = useState([]);
    const { curentUserID } = useContext(CurentUser);
    useEffect(() => {
        try {
            getListFriendRequest().then((result) => {
                setData(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, [reload]);
    return (
        <Grid container>
            <FriendRequestList requests={data} handleAccept={handleAccept} handleDeny={handleDeny} />
        </Grid>
    );
};

export default FriendRequest;
