import { API_BASE_URL } from "~/config/apiConfig";

const createUser = async (user) => {
    try {
        let response = await fetch(`http://localhost:4000/api/users/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

///read user api `http://localhost:4000/api/users/` + userID,   `${API_BASE_URL}/users/`
const readUser = async (params) => {
    try {
        let response = await fetch(`http://localhost:4000/api/users/` + params, {
            method: "GET",
            // signal: signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: "Bearer " + credentials.t,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (form, avatar, userID) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;

    try {
        const formData = new FormData();
        if (avatar) formData.append("avatar", avatar);
        console.log(form);
        // Duyệt qua các key trong userData và thêm vào FormData
        for (let key in form) {
            formData.append(key, form[key]);
            console.log(key, form[key]);
        }
        // Gửi request lên server
        const response = await fetch(`http://localhost:4000/api/users/` + userID, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};
//get list user
const listUser = async () => {
    // lấy danh sách người dùng
    try {
        let response = await fetch(`http://localhost:4000/api/users/`, {
            method: "GET",
            // signal: signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: "Bearer " + credentials.t,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const deleteUser = async (userId) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    sessionStorage.removeItem("jwt");
    try {
        let response = await fetch(`http://localhost:4000/api/users/` + userId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const saveInfo = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getInfo = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "none", email: "none" };
};
export { createUser, readUser, updateUser, deleteUser, listUser, saveInfo, getInfo };
