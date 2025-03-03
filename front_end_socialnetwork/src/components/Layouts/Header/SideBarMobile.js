import React, { useContext } from "react";
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUser, faMessage, faUserGroup, faGear, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { CurentUser } from "~/MainRoutes";

const SidebarMobile = ({ close }) => {
    const { curentUserID, isMobile } = useContext(CurentUser);
    const theme = useTheme(); // Lấy thông tin theme

    const listMenu = [
        {
            title: "Newsfeed",
            path: "/newsfeed",
            icon: faNewspaper,
        },
        {
            title: "Profile",
            path: "/profile/" + curentUserID,
            icon: faUser,
        },

        {
            title: "Friends",
            path: "/friends",
            icon: faUserGroup,
        },
        {
            title: "Groups",
            path: "/groups",
            icon: faPeopleGroup,
        },
        {
            title: "Settings",
            path: "/settings",
            icon: faGear,
        },
    ];

    return (
        <Box
            variant="permanent"
            sx={{
                mt: 10,
                width: 240,
                position: "fixed",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                color: theme.palette.text.primary,
                height: "100%",
                top: isMobile ? "0px" : "0", // Cách top 30px trên mobile
                left: isMobile ? "0px" : "0", // Cách left 30px trên mobile
                width: isMobile ? "calc(100% - 60px)" : "240px", // Giới hạn chiều rộng trên mobile
            }}
        >
            <List>
                {listMenu.map((item, index) => (
                    <ListItem
                        onClick={() => close(false)}
                        button
                        component={Link}
                        to={item.path}
                        key={index}
                        sx={{
                            padding: theme.spacing(2),
                            "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                            },
                            color: theme.palette.text.primary,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: theme.palette.text.primary,
                                "&:hover": {
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={item.title}
                            sx={{
                                fontWeight: "bold",
                                color: theme.palette.text.primary,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SidebarMobile;
