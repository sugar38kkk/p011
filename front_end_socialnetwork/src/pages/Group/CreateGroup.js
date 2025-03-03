import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Box, Grid, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import Sidebar from "~/components/Layouts/Sidebar";
import { createGroup } from "~/services/groupServices/groupService";
import YesNoDialog from "../YesNoDialog";

function CreateGroup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("public"); // Giá trị mặc định là "public"
    const [yesno, setYesNo] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // e.preventDefault();

        try {
            const requestData = {
                name,
                description,
                privacy,
            };

            const response = await createGroup(requestData).then((responseData) => {
                if (responseData) {
                    alert("Create group is success!");
                    navigate("/groups/mygroup");
                } else {
                    console.log(response);
                }
            });
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };
    return (
        <>
            <Grid container>
                <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                    <Sidebar />
                </Grid>
                <Grid item flex={5} sx={{ mt: 5, padding: 10, mr: 5 }} container spacing={3} justifyContent="center">
                    <Box
                        sx={{
                            maxWidth: 500,
                            margin: "0 auto",
                            padding: 4,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                            Create New Group
                        </Typography>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setYesNo(true);
                            }}
                        >
                            <TextField
                                label="Group Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Privacy</InputLabel>
                                <Select value={privacy} onChange={(e) => setPrivacy(e.target.value)} label="Privacy">
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Group
                            </Button>
                            <YesNoDialog
                                yesno={yesno}
                                setYesNo={setYesNo}
                                onConfirm={handleSubmit}
                                title={"onfirm action"}
                                message={"Do you really want to do this?"}
                            />
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateGroup;
