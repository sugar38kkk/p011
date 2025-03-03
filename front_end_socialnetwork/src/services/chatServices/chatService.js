// Route lấy danh sách các cuộc trò chuyện của người dùng router.get('/chats', authenticate, getUserChats);

const getChatList = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch("http://localhost:4000/api/chat/chats", {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to get chat list");
        }
    } catch (error) {
        console.error(error);
    }
};

// Route lấy tin nhắn giữa hai người dùng router.get('/messages/:userId', authenticate, getMessages);
const getChatWithUser = async (userId) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/chat/messages/${userId}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Route gửi tin nhắn router.post('/send',
const sendMessage = async (receiverId, content) => {
    // const tokens = sessionStorage.getItem("jwt");
    // const token = tokens.token;
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/chat/send`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ receiverId: receiverId, content: content }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to get chat list");
        }
    } catch (error) {
        console.error(error);
    }
};
export { getChatList, getChatWithUser, sendMessage };
