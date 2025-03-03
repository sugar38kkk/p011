const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middlewares/authenticateToken');
// Lấy thông báo
router.get('/',authenticateToken, notificationController.getNotifications);

// Đánh dấu thông báo đã đọc
router.post('/read',authenticateToken, notificationController.markAsRead);

module.exports = router;
