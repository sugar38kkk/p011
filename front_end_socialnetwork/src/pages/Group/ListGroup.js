import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { Grid, Box, Typography, Card, CardContent, Button, Avatar } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import { listGroupJoin } from "~/services/groupServices/groupService";

import AddMember from "./AddMember";
import RemoveMember from "./RemoveMember";
import { CurentUser } from "~/MainRoutes";
const GroupCard = ({ group, onJoin, handleReload }) => {
    const [dataGroup, setDataGroup] = useState(group);
    const navigate = useNavigate();
    const { curentUserID } = useContext(CurentUser);
    //open add member
    const [isOpenAddMember, setOpenAddMember] = useState(null);
    const openAddMember = () => {
        setOpenAddMember(true);
    };
    const closeAddMember = () => {
        setOpenAddMember(false);
    };
    //remove member
    const [isOpenRemoveMember, setOpenRemoveMember] = useState(null);
    const openRemoveMember = () => {
        setOpenRemoveMember(true);
    };
    const closeRemoveMember = () => {
        handleReload();
        setOpenRemoveMember(false);
    };

    return (
        <Card
            sx={{ maxWidth: 345, minHeight: 345, maxHeight: 345, margin: "0 auto", boxShadow: 2 }}
            onClick={() =>
                navigate(`/groups/${group?._id}`, {
                    state: { groupData: group },
                })
            }
        >
            {/* <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    color="secondary"
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/groups/update`, {
                            state: { groupData: group },
                        });
                    }}
                    sx={{ textTransform: "none" }}
                >
                    Update Group
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={(event) => {
                        event.stopPropagation();
                        openAddMember();
                    }}
                >
                    Add member
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={(event) => {
                        event.stopPropagation();
                        openRemoveMember();
                    }}
                >
                    Remove member
                </Button>
            </CardContent> */}
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2, // Thêm khoảng cách giữa các phần tử
                }}
            >
                <Avatar
                    alt={group.name}
                    src={group.avatar || "/default-avatar.png"}
                    sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
                    {group.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
                    {group?.members.length} Members
                </Typography>
                <Typography
                    variant="body2"
                    color={group.privacy === "public" ? "primary" : "secondary"}
                    sx={{ fontStyle: "italic", mb: 2, textAlign: "center" }}
                >
                    {group.privacy === "public" ? "Public Group" : "Private Group"}
                </Typography>

                {/* Container để sắp xếp các button */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Mobile: cột, Desktop: hàng
                        gap: 1, // Khoảng cách giữa các button
                        width: "100%", // Đảm bảo container chiếm toàn bộ chiều rộng
                        justifyContent: "center", // Canh giữa các button
                    }}
                >
                    {group?.creator?._id == curentUserID && (
                        <Button
                            variant="contained"
                            color="white"
                            fullWidth // Đảm bảo button chiếm toàn bộ chiều rộng trên mobile
                            onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/groups/update`, {
                                    state: { groupData: group },
                                });
                            }}
                            sx={{ textTransform: "none" }}
                        >
                            Update Group
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="white"
                        fullWidth
                        onClick={(event) => {
                            event.stopPropagation();
                            openAddMember();
                        }}
                        sx={{ textTransform: "none" }}
                    >
                        Add Member
                    </Button>
                    {group?.creator?._id == curentUserID && (
                        <Button
                            variant="contained"
                            color="white"
                            fullWidth
                            onClick={(event) => {
                                event.stopPropagation();
                                openRemoveMember();
                            }}
                            sx={{ textTransform: "none" }}
                        >
                            Remove Member
                        </Button>
                    )}
                </Box>
            </CardContent>

            <RemoveMember
                handleReload={handleReload}
                open={isOpenRemoveMember}
                members={group?.members}
                group={group}
                close={closeRemoveMember}
            />
            <AddMember
                handleReload={handleReload}
                open={isOpenAddMember}
                users={group?.members}
                group={group}
                close={closeAddMember}
            />
        </Card>
    );
};
function ListGroup() {
    const [reload, setReload] = useState(true);
    const handleReload = () => {
        setReload(!reload);
    };
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };
    ////calll api

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gọi API lấy danh sách group
    const fetchGroups = async () => {
        try {
            listGroupJoin().then((groups) => {
                if (groups.message === "No groups found for this user") setGroups([]);
                else setGroups(groups);
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
            if (true) {
                alert("Joined group successfully!");
            }
        } catch (error) {
            console.error("Error joining group:", error);
            alert("Failed to join group.");
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
                            My Groups
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
                                    <GroupCard group={group} onJoin={handleJoinGroup} handleReload={handleReload} />
                                    {/* <DetailGroup /> */}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <FormEditGroup /> */}
                </Grid>
            </Grid>
        </>
    );
}

export default ListGroup;
