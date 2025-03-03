// src/services/authService.js
import { API_BASE_URL } from "~/config/apiConfig";
const login = async (user) => {
    try {
        let response = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include", // Nếu backend yêu cầu cookie
            body: JSON.stringify(user),
        });

        // Kiểm tra nếu response không OK
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            return errorData;
        }

        // Parse dữ liệu JSON
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Fetch error:", err);
    }
};
//loginloi ko nhan dc dât
// const login = async (user) => {
//     try {
//         //https://jsonplaceholder.typicode.com/posts `${API_BASE_URL}api/users/login` 'http://localhost:4000/auth/signin/'
//         let response = await fetch("http://localhost:4000/api/users/login", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify(user),
//         });
//         return await response.json();
//     } catch (err) {
//         console.log(err);
//     }
// };

const logout = async () => {
    sessionStorage.removeItem("jwt");
    localStorage.removeItem("user");
};

// const logout = async () => {
//     sessionStorage.removeItem("jwt");
//     if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
//     try {
//         let response = await fetch(`${API_BASE_URL}/user/logout`, {
//             method: "GET",
//         });
//         return await response.json();
//     } catch (err) {
//         console.log(err);
//     }
// };

export { login, logout };
