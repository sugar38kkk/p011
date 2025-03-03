// User routes
// router.get('/users',authenticateToken, adminMiddleware, AdminController.getAllUsers);
const adminGetUser = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/admin/users`, {
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

// router.delete("/users/:userId", authenticateToken, adminMiddleware, AdminController.deleteUser);
const adminDeleteUser = async (userId) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/admin/users/${userId}`, {
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
// router.put("/users/:userId/role", authenticateToken, adminMiddleware, AdminController.updateUserRole);
const adminUpdateUserRole = async (userId, role) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch(`http://localhost:4000/api/admin/users/${userId}/role`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ role: role }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export { adminGetUser, adminDeleteUser, adminUpdateUserRole };
