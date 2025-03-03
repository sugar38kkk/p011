const Message = require('../models/message');
const User = require('../models/user'); // Mô hình người dùng
const Friendship = require('../models/Friendship');
const moment = require('moment');
const Notification = require('../models/Notification');
// Gửi tin nhắn
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;  // Lấy receiverId và nội dung tin nhắn từ body yêu cầu
        const senderId = req.userId;  // Lấy userId từ middleware xác thực

        // Kiểm tra xem người nhận có tồn tại trong hệ thống không
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Kiểm tra xem hai người có là bạn bè không
        const isFriend = await Friendship.findOne({
            $or: [
                { requester: senderId, recipient: receiverId },
                { requester: receiverId, recipient: senderId }
            ]
        });

        if (!isFriend) {
            return res.status(400).json({ message: 'Receiver is not a friend' });
        }
        // Tạo tin nhắn mới
        const newMessage = new Message({
            senderId,
            receiverId,
            content,
            createdAt: new Date(),
        });

        // Lưu tin nhắn vào cơ sở dữ liệu
        await newMessage.save();

         // Tạo thông báo cho người tạo bài viết
         const user = await User.findById(senderId).select('username'); // Lấy trường 'name' của người dùng


        // **Tạo thông báo**
        const newNotification = new Notification({
            userId: receiverId, // Người nhận thông báo
            type: 'new_message', // Loại thông báo
            message: `${receiver.username}, bạn vừa nhận được một tin nhắn mới từ ${user.username}`, // Nội dung thông báo
            createdAt: new Date(),
            isRead: false // Đánh dấu thông báo chưa được đọc
        });

        // Lưu thông báo vào cơ sở dữ liệu
        await newNotification.save();

        // Trả về tin nhắn vừa tạo
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// lay dnah sach tin nhắn giũa hai người
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy ID người dùng từ URL
        const currentUserId = req.userId; // Lấy userId của người dùng hiện tại từ middleware xác thực
        
        // Tìm tất cả tin nhắn giữa người dùng hiện tại và người dùng khác
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: userId },
                { senderId: userId, receiverId: currentUserId }
            ]
        })
            .sort({ createdAt: 1 }); // Sắp xếp theo thời gian gửi (cũ nhất trước)
        // Định dạng lại createdAt của mỗi tin nhắn
        const formattedMessages = messages.map(message => {
            return {
                ...message.toObject(),
                createdAt: moment(message.createdAt).fromNow() // Định dạng ngày giờ
            };
        });

        res.status(200).json(formattedMessages);
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Lấy danh sách những người đã nhắn tin với người dùng hiện tại
exports.getChatUsers = async (req, res) => {
    try {
        const currentUserId = req.userId; // Lấy userId của người dùng hiện tại từ middleware xác thực

        // Tìm tất cả các tin nhắn mà người dùng hiện tại là người gửi hoặc người nhận
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId },
                { receiverId: currentUserId }
            ]
        });

        // Trích xuất danh sách userId từ tin nhắn
        const userIds = messages.flatMap(msg => 
            msg.senderId.toString() === currentUserId 
                ? msg.receiverId.toString() 
                : msg.senderId.toString()
        );

        // Loại bỏ trùng lặp trong danh sách userId
        const uniqueUserIds = [...new Set(userIds)];

        // Lấy thông tin chi tiết của những người dùng này
        const users = await User.find({ _id: { $in: uniqueUserIds } }).select('username avatar email');

        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting chat users:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};