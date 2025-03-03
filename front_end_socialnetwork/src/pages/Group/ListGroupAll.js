import React, { useContext } from "react";
import { Link, Route, Router, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { Grid, Box, Typography, List, ListItem, ListItemText, Card, CardContent, Button, Avatar } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import { Padding } from "@mui/icons-material";
import CreateGroup from "./CreateGroup";
import axios from "axios";
import { joinToGroup, leaveGroup, listGroupAll, listGroupJoin } from "~/services/groupServices/groupService";
import { CurentUser } from "~/MainRoutes";

const GroupCard = ({ group, onJoin, onLeave }) => {
    //dèine
    const { curentUserID } = useContext(CurentUser);
    const navigate = useNavigate();

    return (
        (group?.privacy === "public" || group?.members?.some((member) => member._id === curentUserID)) && (
            <Card
                sx={{ maxWidth: 345, margin: "0 auto", boxShadow: 2 }}
                onClick={() =>
                    navigate(`/groups/${group?._id}`, {
                        state: { groupData: group },
                    })
                }
            >
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                        alt={group.name}
                        src={group.avatar || "/default-avatar.png"}
                        sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        {group.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {group?.members.length} Members
                    </Typography>
                    <Typography
                        variant="body2"
                        color={group.privacy === "public" ? "primary" : "secondary"}
                        sx={{ fontStyle: "italic", mb: 2 }}
                    >
                        {group.privacy === "public" ? "Public Group" : "Private Group"}
                    </Typography>
                    <Button
                        variant="contained"
                        color={group?.members?.some((member) => member._id === curentUserID) ? "secondary" : "primary"}
                        onClick={(event) =>
                            group?.members?.some((member) => member._id === curentUserID)
                                ? (event.stopPropagation(), onLeave(group._id))
                                : (event.stopPropagation(), onJoin(group._id))
                        }
                        sx={{
                            textTransform: "none",
                            flex: 1, // Các nút chia đều không gian
                            minWidth: 100, // Kích thước tối thiểu của nút
                        }}
                    >
                        {group?.members?.some((member) => member._id === curentUserID) ? "Leave Group" : "Join Group"}
                    </Button>
                </CardContent>
            </Card>
        )
    );
};
function ListGroupAll() {
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const handleCardClick = (path) => {
        navigate(path);
    };
    ////calll api

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gọi API lấy danh sách group
    const fetchGroups = async () => {
        try {
            listGroupAll().then((groups) => {
                if (groups) {
                    setGroups(groups);
                    console.log("listGroupJoin");
                    console.log(groups);
                }
            });
        } catch (error) {
            console.log("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, [reload]);

    const handleJoinGroup = async (groupId) => {
        try {
            const response = await joinToGroup(groupId).then((data) => {
                {
                    alert(data?.message);
                    setReload(!reload);
                }
            });
        } catch (error) {
            alert("Failed to join group.");
        }
    };
    ///leave
    const handleLeaveGroup = async (id) => {
        try {
            const response = await leaveGroup(id).then((data) => {
                if (data) {
                    alert(data?.message);
                    setReload(!reload);
                } else alert("Error");
            });
        } catch (error) {
            console.log(error);
        }
    };
    if (loading) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <>
            <Grid container>
                <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                    <Sidebar />
                </Grid>
                <Grid item flex={5} sx={{ mt: 2, padding: 10, mr: 5 }} container spacing={3} justifyContent="center">
                    <Box sx={{ padding: 4 }}>
                        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
                            Explore Groups
                        </Typography>
                        <Grid container spacing={3}>
                            {groups.map((group) => (
                                <Grid
                                    sx={{ minWidth: 300, maxWidth: 500 }}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={group._id}
                                >
                                    <GroupCard group={group} onJoin={handleJoinGroup} onLeave={handleLeaveGroup} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ListGroupAll;
