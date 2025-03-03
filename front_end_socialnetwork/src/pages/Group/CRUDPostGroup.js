// import React, { useContext, useEffect, useState } from "react";
// import {
//     Card,
//     CardHeader,
//     CardMedia,
//     CardContent,
//     CardActions,
//     Avatar,
//     IconButton,
//     Typography,
//     Divider,
//     Button,
//     List,
//     TextField,
//     Paper,
//     MenuItem,
//     Menu,
//     ListItem,
//     ListItemText,
//     Box,
// } from "@mui/material";
// import { Settings, Favorite, Comment, Group } from "@mui/icons-material";

// import { CurentUser } from "~/MainRoutes";
// import {
//     createComment,
//     deleteComment,
//     editComment,
//     getPost,
//     likePost,
//     unLikePost,
// } from "~/services/postServices/postService";

// import { getPostInGroup } from "~/services/groupServices/groupService";
// import EditPostDialog from "~/pages/NewFeed/EditPostDialog";
// import EditCommentDrawer from "~/pages/NewFeed/EditCommentPopup";
// export const PostInGroup = ({ groupID }) => {
//     const [showComments, setShowComments] = useState({});
//     const [postList, setPostList] = useState([]);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedPostId, setSelectedPostId] = useState(null);

//     const { curentUserID, curentUserToken } = useContext(CurentUser);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const data = await getPostInGroup(groupID);

//                 if (Array.isArray(data)) setPostList(data);
//                 else {
//                     setPostList([]);
//                 }
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách bài post:", error);
//             }
//         })();
//     }, []);

//     //show comment
//     const handleShowComments = (postId) => {
//         setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
//     };
//     //likes post
//     const likePosts = async (postId) => {
//         try {
//             const data = await likePost({ postId }, curentUserToken);
//             setPostList((prevList) =>
//                 prevList.map((post) => (post._id === postId ? { ...post, likes: data.likes } : post)),
//             );
//             if (data.message === "You already liked this post") {
//                 await unLikePost({ postId }, curentUserToken);
//             }
//         } catch (error) {
//             console.error("Lỗi khi like bài post:", error);
//         }
//     };
//     //comment
//     const handleComment = async (postId, newComment) => {
//         try {
//             const data = await createComment({ postId, comment: newComment }, curentUserToken);
//             setPostList((prevList) =>
//                 prevList.map((post) => (post._id === postId ? { ...post, comments: data.comments } : post)),
//             );
//         } catch (error) {
//             console.error("Lỗi khi thêm comment:", error);
//         }
//     };
//     const [selectedPostImage, setSelectedPostImage] = useState("");
//     const [selectedPostContent, setSelectedPostContent] = useState("");
//     const handleMenuOpen = (event, postId, postContent, postImage) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedPostId(postId); // Lưu postId vào state
//         setSelectedPostContent(postContent); // Lưu content
//         setSelectedPostImage(postImage); // Lưu image
//     };
//     ///open menu
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedPostId(null);
//     };
//     const handleCloseDialog = () => {
//         setOpen(false);
//         setAnchorEl(null);
//         setSelectedPostId(null); // Đặt lại giá trị sau khi đóng
//     };
//     ///handle dele update
//     const handleDeleteComment = async (postId, commentId) => {
//         try {
//             // Assuming deleteComment is a function in your service that handles comment deletion.
//             const data = await deleteComment(postId, commentId);
//             if (!data.error) {
//                 console.log(data.message);
//             } else {
//                 console.error("Error deleting comment:", data.message);
//             }
//         } catch (error) {
//             console.error("Error deleting comment:", error);
//         }
//     };

//     const handleEditComment = async (commentId, postId, updatedComment) => {
//         try {
//             // Assuming editComment is a function in your service that handles comment update.
//             const data = await editComment(commentId, postId, updatedComment, curentUserToken);
//             if (!data.error) {
//                 setPostList((prevList) =>
//                     prevList.map((post) =>
//                         post._id === postId
//                             ? {
//                                   ...post,
//                                   comments: post.comments.map((comment) =>
//                                       comment._id === commentId ? { ...comment, comment: updatedComment } : comment,
//                                   ),
//                               }
//                             : post,
//                     ),
//                 );
//             } else {
//                 console.error("Error editing comment:", data.message);
//             }
//         } catch (error) {
//             console.error("Error editing comment:", error);
//         }
//     };

//     //update
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };
//     return (
//         <>
//             {postList.map((item) => (
//                 <Card key={item._id} sx={{ maxWidth: 800, margin: "auto", mt: 3, bgcolor: "#d7e1e2" }}>
//                     <CardHeader
//                         avatar={<Avatar src={item?.userId?.avatar} />}
//                         title={item?.userId?.username}
//                         subheader={`${item?.createdAt} with role ${item?.visibility}`}
//                         action={
//                             item?.userId?._id === curentUserID && (
//                                 <IconButton
//                                     size="small"
//                                     onClick={(event) => handleMenuOpen(event, item._id, item.content, item.image)}
//                                 >
//                                     <Settings />
//                                 </IconButton>
//                             )
//                         }
//                     />
//                     {open && selectedPostId === item._id && (
//                         <EditPostDialog
//                             open={open}
//                             onClose={handleCloseDialog}
//                             postId={selectedPostId}
//                             postContent={selectedPostContent}
//                             postImage={selectedPostImage}
//                         />
//                     )}
//                     <Divider />

//                     <CardContent>
//                         <Typography variant="body2">{item.content}</Typography>
//                     </CardContent>

//                     {item?.image && <CardMedia component="img" image={item?.image} alt="Post Image" />}

//                     <CardActions disableSpacing>
//                         <IconButton onClick={() => likePosts(item._id)}>
//                             <Favorite color={item?.likes?.includes(curentUserID) ? "error" : "inherit"} />
//                         </IconButton>
//                         <Typography variant="body2">{item?.likes?.length || 0} Likes</Typography>

//                         <IconButton onClick={() => handleShowComments(item._id)}>
//                             <Comment />
//                         </IconButton>
//                         <Typography variant="body2">{item?.comments?.length || 0} Comments</Typography>
//                     </CardActions>

//                     {showComments[item?._id] && (
//                         <CommentList
//                             curentUserID={curentUserID}
//                             comments={item?.comments || []}
//                             onAddComment={(newComment) => handleComment(item._id, newComment)}
//                             onEditComment={handleEditComment}
//                             onDeleteComment={handleDeleteComment}
//                             postID={item._id}
//                         />
//                     )}

//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleMenuClose}
//                         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                         transformOrigin={{ vertical: "top", horizontal: "right" }}
//                     >
//                         <MenuItem onClick={() => setOpen(true)}>Update</MenuItem>
//                         <MenuItem onClick={() => console.log("Delete Post")}>Delete</MenuItem>
//                     </Menu>
//                 </Card>
//             ))}
//         </>
//     );
// };

// const CommentList = ({ comments, postID, curentUserID, onAddComment, onEditComment, onDeleteComment }) => {
//     const [newComment, setNewComment] = useState("");
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedCommentId, setSelectedCommentId] = useState(null);
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     // Xử lý mở Menu chỉnh sửa/xóa
//     const handleMenuOpen = (event, commentId) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedCommentId(commentId);
//     };

//     // Đóng Menu
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedCommentId(null);
//     };

//     // Xử lý gửi comment mới
//     const handleSendComment = () => {
//         if (newComment.trim()) {
//             onAddComment(newComment);
//             setNewComment("");
//         }
//     };
//     console.log(comments);

//     return (
//         <Paper elevation={3} sx={{ padding: 2, bgcolor: "#d7e1e2" }}>
//             <Typography variant="h6" sx={{ mb: 1 }}>
//                 Comments
//             </Typography>

//             {/* Hiển thị danh sách comment */}
//             <Box sx={{ maxHeight: 150, overflowY: "auto", borderRadius: 1, padding: 1, bgcolor: "#d7d7ee" }}>
//                 <List>
//                     {comments.length > 0 ? (
//                         comments.map((comment) => (
//                             <React.Fragment key={comment._id}>
//                                 <ListItem alignItems="flex-start">
//                                     <Avatar src={comment?.userId?.avatar} sx={{ mr: 1 }} />

//                                     <ListItemText
//                                         primary={
//                                             <Typography component="span" variant="body1" fontWeight="bold">
//                                                 {comment?.userId?.username}
//                                             </Typography>
//                                         }
//                                         secondary={
//                                             <>
//                                                 <Typography
//                                                     component="span"
//                                                     variant="caption"
//                                                     color="text.secondary"
//                                                     sx={{ display: "block", fontSize: "0.65rem" }}
//                                                 >
//                                                     comment {comment?.createdAt}
//                                                 </Typography>
//                                                 <Typography variant="body2">{comment?.comment}</Typography>
//                                             </>
//                                         }
//                                     />

//                                     {/* Kiểm tra nếu user đang đăng nhập là người tạo comment thì hiển thị nút chỉnh sửa */}
//                                     {comment?.userId?._id === curentUserID && (
//                                         <Box sx={{ marginLeft: "auto" }}>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={(event) => handleMenuOpen(event, comment._id)}
//                                             >
//                                                 <Settings />
//                                             </IconButton>
//                                         </Box>
//                                     )}
//                                 </ListItem>
//                                 <Divider />

//                                 {/* Menu chỉnh sửa hoặc xóa comment */}
//                                 <Menu
//                                     anchorEl={anchorEl}
//                                     open={Boolean(anchorEl) && selectedCommentId === comment._id}
//                                     onClose={handleMenuClose}
//                                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                                     transformOrigin={{ vertical: "top", horizontal: "right" }}
//                                 >
//                                     <MenuItem
//                                         onClick={() => {
//                                             onEditComment(postID, selectedCommentId);
//                                             handleMenuClose();
//                                             handleOpen();
//                                         }}
//                                     >
//                                         Update
//                                     </MenuItem>
//                                     <MenuItem
//                                         onClick={() => {
//                                             onDeleteComment(postID, selectedCommentId);
//                                             handleMenuClose();
//                                         }}
//                                     >
//                                         Delete
//                                     </MenuItem>
//                                 </Menu>
//                                 {open && (
//                                     <>
//                                         <EditCommentDrawer
//                                             open={open}
//                                             onClose={handleClose}
//                                             commentold={comment?.comment}
//                                             postID={postID}
//                                             commentId={comment._id}
//                                         />
//                                         {/* <EditPostDialog open={open} postId /> */}
//                                     </>
//                                 )}
//                             </React.Fragment>
//                         ))
//                     ) : (
//                         <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
//                             No comments yet.
//                         </Typography>
//                     )}
//                 </List>
//             </Box>

//             {/* Form thêm comment mới */}
//             <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                 <TextField
//                     fullWidth
//                     size="small"
//                     placeholder="Write a comment..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     sx={{ mr: 1 }}
//                 />
//                 <Button variant="contained" onClick={handleSendComment}>
//                     Send
//                 </Button>
//             </Box>
//         </Paper>
//     );
// };

//new

import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Button,
    List,
    TextField,
    Paper,
    MenuItem,
    Menu,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import { Settings, Favorite, Comment } from "@mui/icons-material";

import { CurentUser } from "~/MainRoutes";
import {
    createComment,
    deleteComment,
    editComment,
    getPost,
    likePost,
    unLikePost,
} from "~/services/postServices/postService";

import EditPostDialog from "~/pages/NewFeed/EditPostDialog";
import CommentList from "~/pages/Group/Comment";
import { getPostInGroup } from "~/services/groupServices/groupService";
import EditPostGroupDialog from "./EditPostDialog";
export default function PostInGroup({ groupID }) {
    const [showComments, setShowComments] = useState({});
    const [postList, setPostList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { curentUserID, curentUserToken } = useContext(CurentUser);

    useEffect(() => {
        (async () => {
            try {
                const data = await getPostInGroup(groupID);
                if (data.message === "You must be a member to view posts in this group") {
                    // alert("You must be a member to view posts in this group.");
                } else {
                    setPostList(data);
                }
            } catch (error) {
                if (error.status === 403) {
                    console.error("Bạn không có quyền truy cập vào nhóm này.");
                    alert("Bạn không có quyền truy cập vào nhóm này.");
                } else {
                    console.error("Lỗi khi lấy danh sách bài post:", error.message);
                }
            }
        })();
    }, [curentUserID]);

    const likePosts = async (postId) => {
        try {
            const data = await likePost({ postId }, curentUserToken);
            setPostList((prevList) =>
                prevList.map((post) => (post._id === postId ? { ...post, likes: data.likes } : post)),
            );
            // If already liked, un-like
            if (data.message === "You already liked this post") {
                await unLikePost({ postId }, curentUserToken);
            }
            // Re-fetch the updated list of posts after the like/unlike action
            const updatedData = await getPostInGroup(groupID);
            setPostList(updatedData);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const [selectedPostImage, setSelectedPostImage] = useState("");
    const [selectedPostContent, setSelectedPostContent] = useState("");
    const handleMenuOpen = (event, postId, postContent, postImage) => {
        setAnchorEl(event.currentTarget);
        setSelectedPostId(postId); // Lưu postId vào state
        setSelectedPostContent(postContent); // Lưu content
        setSelectedPostImage(postImage); // Lưu image
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPostId(null);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setAnchorEl(null);
        setSelectedPostId(null); // Đặt lại giá trị sau khi đóng
    };

    //updatye
    const [open, setOpen] = useState(false);

    const handleShowComments = (postId) => {
        setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };
    return (
        <>
            {postList.map((item) => (
                <Card
                    key={item._id}
                    sx={{
                        maxWidth: 635,
                        mb: 3,
                        bgcolor: "background.paper",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    <CardHeader
                        avatar={<Avatar src={item?.userId?.avatar} />}
                        title={item?.userId?.username || "Member" || item?.userId?.username}
                        subheader={`${item?.createdAt} role  ${item?.visibility}`}
                        action={
                            (item?.userId?._id === curentUserID || item?.userId) === curentUserID && (
                                <IconButton
                                    size="small"
                                    onClick={(event) => handleMenuOpen(event, item._id, item.content, item.image)}
                                >
                                    <Settings />
                                </IconButton>
                            )
                        }
                    />

                    {open && selectedPostId === item._id && (
                        <EditPostGroupDialog
                            open={open}
                            onClose={handleCloseDialog}
                            postId={selectedPostId}
                            postContent={selectedPostContent}
                            postImage={selectedPostImage}
                            setPostList={setPostList}
                            groupID={groupID}
                        />
                    )}
                    <Divider />

                    <CardContent>
                        <Typography variant="body2">{item.content}</Typography>
                    </CardContent>

                    {item?.image && <CardMedia component="img" image={item?.image} alt="Post Image" />}

                    <CardActions disableSpacing>
                        <IconButton onClick={() => likePosts(item._id)}>
                            <Favorite color={item?.likes?.includes(curentUserID) ? "error" : "inherit"} />
                        </IconButton>
                        <Typography variant="body2">{item?.likes?.length || 0} Likes</Typography>

                        <IconButton onClick={() => handleShowComments(item._id)}>
                            <Comment />
                        </IconButton>
                        <Typography variant="body2">{item?.comments?.length || 0} Comments</Typography>
                    </CardActions>

                    {showComments[item?._id] && (
                        <CommentList
                            groupID={groupID}
                            comments={item?.comments || []}
                            postID={item._id}
                            setPostList={setPostList}
                        />
                    )}
                </Card>
            ))}{" "}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={() => setOpen(true)}>Update</MenuItem>
                {/* <MenuItem onClick={() => console.log("Delete Post")}>Delete</MenuItem> */}
            </Menu>
        </>
    );
}
