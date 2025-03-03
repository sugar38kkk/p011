import { API_BASE_URL } from "~/config/apiConfig";

const getPost = async () => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    try {
        // Gửi request lên server
        const response = await fetch(`http://localhost:4000/api/posts/userPosts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
        });

        return await response.json();
    } catch (err) {
        console.error(err);
    }
};
//call api create post
const createPost = async (content, image, video, visibility) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;

    const formData = new FormData();
    formData.append("content", content);
    console.log(formData);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
    formData.append("visibility", visibility);
    console.log("form lasttest");
    console.log(formData);

    try {
        const response = await fetch("http://localhost:4000/api/posts/create", {
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};
//cal api update commnet
const updatePost = async (postId, content, image) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;

    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("content", content);
    // console.log(formData);
    formData.append("image", image);

    try {
        let response = await fetch(`http://localhost:4000/api/posts/edit-post`, {
            method: "PUT",
            headers: {
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
//call api like post
const likePost = async (postId, token) => {
    try {
        let response = await fetch(`http://localhost:4000/api/posts/like`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(postId),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//call api unlike post
const unLikePost = async (postId, token) => {
    try {
        let response = await fetch(`http://localhost:4000/api/posts/unlike`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(postId),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
//call api comment post
const createComment = async (data) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    try {
        let response = await fetch(`http://localhost:4000/api/posts/comment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//cal api update commnet
const editComment = async (formData) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    try {
        let response = await fetch(`http://localhost:4000/api/posts/edit-comment`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(formData),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//cal api update commnet
const deleteComment = async (postId, commentId) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    try {
        let response = await fetch(`http://localhost:4000/api/posts/delete-comment`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify({ postId: postId, commentId: commentId }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export { getPost, updatePost, likePost, createComment, unLikePost, createPost, editComment, deleteComment };
