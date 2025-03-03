import React, { useState, useEffect, useRef } from "react";
import {
    TextField,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    InputAdornment,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchHeader } from "~/services/searchServices/search";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const theme = useTheme(); // Lấy theme hiện tại từ MUI

    useEffect(() => {
        if (keyword.trim() === "") {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await searchHeader(keyword);
                if (data.users || data.groups) {
                    setResults(data);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchResults, 500);
        return () => clearTimeout(debounceTimeout);
    }, [keyword]);

    const handleBlur = () => {
        setKeyword("");
        setResults([]);
    };

    return (
        <Box
            sx={{
                width: 400,
                margin: "auto",
                position: "relative",
                borderRadius: 2,
            }}
            ref={inputRef}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search...."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: { borderRadius: 7 },
                }}
            />

            {(results?.users || results?.groups) && (
                <List
                    sx={{
                        position: "fixed",
                        top: inputRef.current?.getBoundingClientRect().bottom + window.scrollY + 8,
                        left: inputRef.current?.getBoundingClientRect().left,
                        width: inputRef.current?.offsetWidth,
                        maxHeight: 200,
                        overflowY: "auto",
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`, // Sử dụng màu border từ theme
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 6,
                        zIndex: 10,
                    }}
                >
                    {results?.users.map((user) => (
                        <ListItem
                            key={user._id}
                            sx={{
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                "&:hover": { backgroundColor: theme.palette.action.hover },
                            }}
                            onClick={() => {
                                navigate(`/profile/${user._id}`);
                                handleBlur();
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar alt={user.username} src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={user.email} />
                        </ListItem>
                    ))}
                    {results?.groups.map((group) => (
                        <ListItem
                            key={group._id}
                            sx={{
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                "&:hover": { backgroundColor: theme.palette.action.hover },
                            }}
                            onClick={() => {
                                navigate(`/groups/${group?._id}`, {
                                    state: { groupData: group },
                                });

                                handleBlur();
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar alt={group.name} src={group.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={group.name} secondary={`${group.privacy} group`} />
                        </ListItem>
                    ))}
                    {results?.users.length === 0 && results?.groups.length === 0 && (
                        <ListItem sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <ListItemText primary={"No results"} />
                        </ListItem>
                    )}
                </List>
            )}
        </Box>
    );
};

export default SearchComponent;
