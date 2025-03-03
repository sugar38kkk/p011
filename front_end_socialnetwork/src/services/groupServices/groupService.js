const createGroup = async ({ name, description, privacy }) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    const formGroup = {
        name,
        description,
        privacy,
    };
    try {
        let response = await fetch("http://localhost:4000/api/groups/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(formGroup),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

///call api list group join
const listGroupJoin = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        let response = await fetch("http://localhost:4000/api/groups/user/groups", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
//call api lít group all

const listGroupAll = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        let response = await fetch("http://localhost:4000/api/groups/allgroups", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

// cap nhat group router.put('/edit-group',
///const { groupId, name, description, privacy} = req.body; groupId, name, description, privacy, avatar
const editGroup = async (formData) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    try {
        const response = await fetch("http://localhost:4000/api/groups//edit-group", {
            method: "PUT",
            headers: {
                authorization: "Bearer " + token,
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
///call api add member to group

const addMemberToGroup = async (groupId, userId) => {
    // Lấy dữ liệu từ sessionStorag
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    //sử lí data
    const form = {
        groupId,
        userId,
    };
    console.log("data send " + form);
    try {
        const response = await fetch("http://localhost:4000/api/groups/add-member", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(form),
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
///call api add member to group

const joinToGroup = async (groupId) => {
    // Lấy dữ liệu từ sessionStorag
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    //sử lí data
    const form = {
        groupId,
    };
    console.log("data send " + form);
    try {
        const response = await fetch("http://localhost:4000/api/groups/join", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(form),
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
// Xóa thành viên khỏi nhóm router.post('/remove-member'
const removeMemberToGroup = async (groupId, userId) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    const form = {
        groupId,
        userId,
    };
    console.log("data send " + form);
    try {
        const response = await fetch("http://localhost:4000/api/groups/remove-member", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(form),
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
// Đăng bài trong nhóm router.post('/post'
const createPostInGroup = async (groupId, content, image, video) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;

    const formData = new FormData();
    formData.append("content", content);
    console.log(formData);
    if (groupId) formData.append("groupId", groupId);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
        const response = await fetch("http://localhost:4000/api/groups/post", {
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
// Xem danh sách bài đăng trong nhóm router.get('/:groupId/posts'
const getPostInGroup = async (groupID) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    //sử lí data

    try {
        const response = await fetch(`http://localhost:4000/api/groups/${groupID}/posts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
// Rời khỏi nhóm router.post('/leave'
const leaveGroup = async (groupId) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    //sử lí data

    try {
        const response = await fetch("http://localhost:4000/api/groups/leave", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify({ groupId: groupId }),
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};
// Lấy danh sách các nhóm người dùng tham gia router.get('/user/groups'
const getListUserInGroup = async (groupID, userID, memberID) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;

    //sử lí data

    try {
        const response = await fetch("http://localhost:4000/api/groups/user/groups", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(userID, memberID),
        });
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
};

export {
    createGroup,
    listGroupJoin,
    listGroupAll,
    addMemberToGroup,
    removeMemberToGroup,
    createPostInGroup,
    getPostInGroup,
    leaveGroup,
    getListUserInGroup,
    editGroup,
    joinToGroup,
};
