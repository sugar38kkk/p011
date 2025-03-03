// import { useState, useEffect } from 'react';

// export default function Chatting() {
//     const [data, setData] = useState(false);
//     const [result, setJson] = useState([]);
//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/photos/1')
//             .then((response) => response.json())
//             .then((json) => {
//                 if (Array.isArray(json)) {
//                     setJson(json);
//                 } else {
//                     setData(json);
//                 }
//             })
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);
//     console.log('mouted chat list');
//     return (
//         <div class="modal-popup-chat d-block">
//             <div class="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
//                 <div class="modal-popup-header w-100 border-bottom">
//                     <div class="card p-3 d-block border-0 d-block">
//                         <figure class="avatar mb-0 float-left me-2">
//                             <img src="images/user-12.png" alt="image" class="w35 me-1" />
//                         </figure>
//                         <h5 class="fw-700 text-primary font-xssss mt-1 mb-1">Hendrix Stamp</h5>
//                         <h4 class="text-grey-500 font-xsssss mt-0 mb-0">
//                             <span class="d-inline-block bg-success btn-round-xss m-0"></span> Available
//                         </h4>
//                         <a href="#" class="font-xssss position-absolute right-0 top-0 mt-3 me-4">
//                             <i class="ti-close text-grey-900 mt-2 d-inline-block"></i>
//                         </a>
//                     </div>
//                 </div>
//                 <div class="modal-popup-body w-100 p-3 h-auto">
//                     <div class="message">
//                         <div class="message-content font-xssss lh-24 fw-500">Hi, how can I help you?</div>
//                     </div>
//                     <div class="date-break font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">Mon 10:20am</div>
//                     <div class="message self text-right mt-2">
//                         <div class="message-content font-xssss lh-24 fw-500">
//                             I want those files for you. I want you to send 1 PDF and 1 image file.
//                         </div>
//                     </div>
//                     <div
//                         class="snippet pt-3 ps-4 pb-2 pe-3 mt-2 bg-grey rounded-xl float-right"
//                         data-title=".dot-typing"
//                     >
//                         <div class="stage">
//                             <div class="dot-typing"></div>
//                         </div>
//                     </div>
//                     <div class="clearfix"></div>
//                 </div>
//                 <div class="modal-popup-footer w-100 border-top">
//                     <div class="card p-3 d-block border-0 d-block">
//                         <div class="form-group icon-right-input style1-input mb-0">
//                             <input
//                                 type="text"
//                                 placeholder="Start typing.."
//                                 class="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
//                             />
//                             <i class="feather-send text-grey-500 font-md"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { Drawer, Box, Button, Backdrop, List, ListItem, ListItemText } from "@mui/material";

const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
];

const App = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const [isChatOpen, setChatOpen] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
        if (!isDrawerOpen) setChatOpen(false); // Đóng chat khi đóng popup chính
    };

    const openChatWithUser = (user) => {
        setActiveUser(user);
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
        setActiveUser(null);
    };
    const [messageText, setMessageText] = useState([]);
    function message() {
        fetch("https://jsonplaceholder.typicode.com/comments/1")
            .then((response) => response.json())
            .then((data) => setMessageText(data))
            .catch((error) => console.error("Error:", error));
    }
    return (
        <div>
            {/* Nút để mở popup chính */}
            <Button variant="contained" onClick={toggleDrawer}>
                Open User List
            </Button>

            {/* Backdrop để đóng popup khi click bên ngoài */}
            <Backdrop open={isDrawerOpen} onClick={toggleDrawer} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }} />

            {/* Drawer chính chứa danh sách người dùng */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    paddingTop: 4,
                    "& .MuiDrawer-paper": {
                        width: 300,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box role="presentation" sx={{ width: 300, padding: 2 }} onClick={(e) => e.stopPropagation()}>
                    <h3>Danh sách người dùng</h3>
                    <List>
                        {users.map((user) => (
                            <ListItem button key={user.id} onClick={() => openChatWithUser(user)}>
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Drawer phụ chứa chat riêng cho từng người dùng */}
            <Drawer
                anchor="right"
                open={isChatOpen}
                onClose={closeChat}
                sx={{
                    width: 300,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 300,
                        boxSizing: "border-box",
                        right: 350, // Cách lề phải 350px
                    },
                }}
            >
                <Box role="presentation" sx={{ width: 300, padding: 2 }}>
                    <h3>Chat với {activeUser?.name}</h3>

                    <p>
                        Đây là cửa sổ chat với {activeUser?.name}. {messageText.body}
                    </p>
                </Box>
            </Drawer>
        </div>
    );
};

export default App;
