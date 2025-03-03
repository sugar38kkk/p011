// Message routes
//router.get("/messages", authenticateToken, adminMiddleware, AdminController.getAllMessages);

const adminGetMessage = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/admin/messages`, {
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
// router.delete("/messages/:messageId", authenticateToken, adminMiddleware, AdminController.deleteMessage);

const adminDeleteMessage = async (messageId) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/admin/messages/${messageId}`, {
            method: "DELETE",
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
export { adminGetMessage, adminDeleteMessage };
