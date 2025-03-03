// import React, { useState } from "react";
// import { Drawer, TextField, Button, Typography } from "@mui/material";
// import { editComment } from "~/services/postServices/postService";

// const EditCommentDrawer = ({ open, onClose, onUpdateComment, commentold, postID, commentId }) => {
//     const [newComment, setNewComment] = useState(commentold.comment);

//     const handleCommentChange = (event) => {
//         setNewComment(event.target.value);
//     };

//     const handleSendClick = () => {
//         editComment({ postId: postID, comment: newComment, commentId: commentId });
//     };

//     return (
//         <Drawer
//             anchor="center" // Đặt Drawer ở giữa màn hình
//             open={open}
//             onClose={onClose}
//             ModalProps={{
//                 keepMounted: true, // Giúp Drawer luôn hoạt động ngay cả khi không mở
//             }}
//         >
//             <div style={{ width: 400, padding: "20px" }}>
//                 <Typography variant="h6" gutterBottom>
//                     Edit Comment
//                 </Typography>
//                 <TextField
//                     label="Comment"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     value={newComment || commentold}
//                     onChange={handleCommentChange}
//                     style={{ marginBottom: "20px" }}
//                 />
//                 <Button variant="contained" color="primary" onClick={handleSendClick} fullWidth>
//                     Send
//                 </Button>
//             </div>
//         </Drawer>
//     );
// };

// export default EditCommentDrawer;
// import React, { useState } from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";
// import { editComment } from "~/services/postServices/postService";

// const EditCommentPopup = ({ open,commentold, postID, commentId }) => {
//     const [newComment, setNewComment] = useState(commentold.comment);

//     const handleCommentChange = (event) => {
//         setNewComment(event.target.value);
//     };

//     const handleSendClick = () => {
//         editComment({ postId: postID, comment: newComment, commentId: commentId });
//         // onClose(); // Đóng popup sau khi gửi bình luận
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitle>Edit Comment</DialogTitle>
//             <DialogContent>
//                 <Typography variant="body2" gutterBottom>
//                     Please edit your comment below:
//                 </Typography>
//                 <TextField
//                     label="Comment"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     value={commentold && newComment}
//                     onChange={handleCommentChange}
//                     style={{ marginBottom: "20px" }}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="secondary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleSendClick} color="primary" variant="contained">
//                     Send
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default EditCommentPopup;

import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";
import { editComment, getPost } from "~/services/postServices/postService";

const EditCommentPopup = ({ open, onClose, commentold, postID, commentId, setPostList }) => {
    const [newComment, setNewComment] = useState(commentold);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSendClick = async () => {
        await editComment({ postId: postID, comment: newComment, commentId: commentId });
        const updatedData = await getPost();
        setPostList(updatedData);
        onClose(); // Đóng popup sau khi gửi bình luận
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogContent>
                <Typography variant="body2" gutterBottom>
                    Please edit your comment below:
                </Typography>
                <TextField
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{ marginBottom: "20px" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSendClick} color="primary" variant="contained">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCommentPopup;
