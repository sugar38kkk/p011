///call api get list friends
const getListFriend = async () => {
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    try {
        const response = await fetch("http://localhost:4000/api/friends/list", {
            method: "GET",
            headers: {
                Accept: "application/json",
                authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (error) {
        {
            console.log(error);
        }
    }
};

///call api get list friends request
const getListFriendRequest = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        const response = await fetch("http://localhost:4000/api/friends/sent-requests", {
            methost: "GET",
            headers: { Accept: "application/json", authorization: "Bearer " + token },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

///call api Poss list friends request
const addFriendAPI = async (recipientIDs) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        let response = await fetch("http://localhost:4000/api/friends/request", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify({ recipientId: recipientIDs }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
///api accept
const acceptFriendRequest = async (requester) => {
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    try {
        let response = await fetch(`http://localhost:4000/api/friends/accept`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify({ requesterId: requester }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

///api rejectFriendRequest  /reject : delete
const rejectFriendRequest = async (requesterId) => {
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    try {
        let response = await fetch(`http://localhost:4000/api/friends/reject`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify({ requesterId: requesterId }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
// api remove removeFriend   /remove : delete
const removeFriend = async (friendId) => {
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    try {
        let response = await fetch(`http://localhost:4000/api/friends/remove`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify({ friendId: friendId }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
export { getListFriend, getListFriendRequest, addFriendAPI, acceptFriendRequest, rejectFriendRequest, removeFriend };
