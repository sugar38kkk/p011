import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";
import { getChatList, getChatWithUser } from "~/services/chatServices/chatService";
import { getListFriend } from "~/services/friendServices/friendService";

const ChatListContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    right: 0,
    top: 0,
    width: 320, // Tăng chiều rộng một chút để nội dung thoải mái hơn
    height: "90vh", // Chiều cao chiếm 90% màn hình để không bị chật
    background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.grey[300]})`, // Hiệu ứng gradient
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // Shadow mềm mại
    borderRadius: "16px 0 0 16px", // Bo góc tròn ở bên trái
    overflowY: "auto",
    zIndex: 1300,
    padding: theme.spacing(2),
    marginTop: theme.spacing(10), // Để tránh bị che bởi header
    marginRight: theme.spacing(2), // Khoảng cách với viền màn hình
}));

const ChatList = () => {
    const [chats, setChats] = useState([]); // Khởi tạo mảng rỗng
    const [listFriend, setListFriend] = useState([]); // Khởi tạo mảng rỗng
    const userId = "672ebaf8c63b15d5410fe80d"; // ID người dùng mẫu

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const data = await getChatList();
                const friend = await getListFriend();
                console.log(data);
                setChats(data); // Cập nhật mảng chats với dữ liệu từ API
                setListFriend(friend);
            } catch (error) {
                console.error("Failed to fetch chats:", error);
            }
        };

        fetchChatList();
    }, [userId]); // Chỉ chạy lại khi userId thay đổi

    //click to open chat windows
    const [openChat, setOpenChat] = useState(false);
    const [chatFriend, setChatFriend] = useState([]);
    function handleOpenChat(x) {
        setOpenChat(!openChat);
        setChatFriend(x);
    }

    const handleCloseChat = () => {
        setOpenChat(!openChat);
    };
    return (
        <ChatListContainer
            sx={{
                zIndex: 10,
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    textAlign: "center", // Căn giữa tiêu đề
                    fontWeight: "bold", // Tăng độ đậm
                    color: (theme) => theme.palette.text.primary, // Lấy màu chữ theo theme
                    zIndex: 10,
                }}
            >
                Chat List
            </Typography>
            <List
                sx={{
                    paddingTop: 2,
                    "& > *:not(:last-child)": {
                        marginBottom: 1, // Khoảng cách giữa các ListItem
                    },
                }}
            >
                {chats.map((chat, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            border: "1px solid rgba(0,0,0,0.1)", // Đường viền nhẹ
                            borderRadius: 2, // Bo góc của từng item
                            "&:hover": {
                                backgroundColor: "#f0f2f5", // Màu nâu nhẹ giống Facebook
                                cursor: "pointer", // Thêm hiệu ứng con trỏ
                            },
                        }}
                        alignItems="flex-start"
                        onClick={() => handleOpenChat(chat)}
                    >
                        <ListItemAvatar>
                            <Avatar alt={chat.name} src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat?.username}
                            secondary={
                                <Typography component="span" variant="body2" color="text.secondary" noWrap>
                                    {chat?.email}
                                </Typography>
                            }
                        />
                        {chat.hasNewMessage && (
                            <Badge
                                color="error"
                                variant="dot"
                                sx={{
                                    marginLeft: "auto",
                                }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
            {openChat && <ChatWindow friend={chatFriend} onClose={handleCloseChat} />}
        </ChatListContainer>
    );
};

export default ChatList;
