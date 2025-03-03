import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { CurentUser } from "~/MainRoutes";
import { addFriend, addFriendAPI, getListFriend } from "~/services/friendServices/friendService";
import { listUser, readUser } from "~/services/userServices/userService";
import { useNavigate } from "react-router-dom";

const FriendRequestCard = ({ request, onAdd }) => {
    const navigate = useNavigate();
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
            onClick={() => {
                navigate(`/profile/${request._id}`);
            }}
        >
            <Box>
                <Avatar src={request.avatar} alt={request.username} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <Typography variant="body1" fontWeight="600" mt={1}>
                    {request.username}
                </Typography>
                {request?.following && (
                    <Typography variant="caption" color="textSecondary">
                        {request?.following.lenght || 0} Friends
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={(event) => {
                        event.stopPropagation();
                        onAdd(request._id);
                    }}
                    sx={{ textTransform: "none" }}
                >
                    Add friend
                </Button>
            </Box>
        </Box>
    );
};

const FriendRequestList = ({ list, handleAdd }) => {
    const { curentUserID } = useContext(CurentUser);
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                List User
            </Typography>
            <Grid container spacing={2}>
                {list
                    .filter((request) => request?._id !== curentUserID)
                    .map((request) => (
                        <Grid item key={request._id}>
                            <FriendRequestCard request={request} onAdd={handleAdd} />
                        </Grid>
                    ))}
            </Grid>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => alert("This is all user!")}
            >
                See all user
            </Typography>
        </Box>
    );
};
// Component chính
const ExploreFriend = () => {
    //value
    const [reload, setReload] = useState(false);
    const { curentUserID } = useContext(CurentUser);

    const addFriend = (recipientID) => {
        try {
            addFriendAPI(recipientID).then((response) => {
                if (response) {
                    setReload(!reload);
                    alert(response.message);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    //caall api getList
    const [user, setUser] = useState([]);
    const [friend, setFriend] = useState([]);
    useEffect(() => {
        try {
            getListFriend(curentUserID).then((result) => {
                setFriend(result);
            });
            listUser().then((result) => {
                setUser(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, [reload]);
    console.log(user);
    console.log(friend);
    return (
        <Grid container>
            <FriendRequestList
                list={[
                    ...user.filter((item) => !friend.some((item1) => item1?._id === item?._id)),
                    ...friend.filter((item) => !user.some((item2) => item2?._id === item?._id)),
                ]}
                handleAdd={addFriend}
            />
        </Grid>
    );
};

export default ExploreFriend;
