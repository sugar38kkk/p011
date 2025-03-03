// controllers/notificationController.js
const Notification = require('../models/Notification');
const Friendship = require('../models/Friendship');
const User = require('../models/user');
// API Tạo thông báo
exports.createNotification = async ({ userId, type, message, postId = null }) => {
    try {
        const notification = new Notification({
            userId,
            type,
            message,
            postId
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

// controllers/notificationController.js

// API Lấy thông báo của người dùng
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.userId; // Lấy ID người dùng từ middleware xác thực

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Sắp xếp mới nhất
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// controllers/notificationController.js

// API Đánh dấu thông báo là đã đọc
exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true; // Đánh dấu đã đọc
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Gửi thông báo cho bạn bè
exports.sendNotificationsToFriends = async (userId, newPost) => {
    try {
        // Tìm danh sách bạn bè từ bảng Friendship (mối quan hệ đã được chấp nhận)
        const friendships = await Friendship.find({
            $or: [
                { requester: userId, status: 'accepted' },
                { recipient: userId, status: 'accepted' }
            ]
        });

        // Trích xuất danh sách bạn bè (loại bỏ userId)
        const friends = friendships.map(friendship => 
            friendship.requester.toString() === userId ? friendship.recipient : friendship.requester
        );

        if (!friends || friends.length === 0) {
            return; // Không có bạn bè thì không gửi thông báo
        }

        // Tạo thông báo cho người tạo bài viết
        const user = await User.findById(userId).select('username'); // Lấy trường 'name' của người dùng


        // Tạo thông báo gửi đến từng bạn bè
        const notifications = friends.map(friendId => ({
            userId: friendId, // Người nhận thông báo
            type: 'new_post',
            message: `Người dùng ${user.username} đã tạo một bài viết mới.`,
            postId: newPost._id, // Liên kết đến bài viết
            createdAt: new Date()
        }));

        // Lưu thông báo vào cơ sở dữ liệu
        await Notification.insertMany(notifications);
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
};
