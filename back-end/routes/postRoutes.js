const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');

// API tạo bài viết
router.post('/create', authenticateToken,upload.single('image'), postController.createPost);

// API lấy danh sách bài viết của người dùng
router.get('/userPosts', authenticateToken, postController.getUserPosts);

// API like bài viết
router.post('/like', authenticateToken, postController.likePost);

// API bình luận bài viết
router.post('/comment', authenticateToken, postController.commentPost);

router.post('/unlike', authenticateToken, postController.unlikePost);

// Route Xóa Bình Luận
router.post('/delete-comment', authenticateToken, postController.deleteComment);

// Route Sửa Bài Viết
router.put('/edit-post', authenticateToken,upload.single('image'), postController.editPost);

// Route Sửa Bình Luận
router.put('/edit-comment', authenticateToken, postController.editComment);

module.exports = router;
