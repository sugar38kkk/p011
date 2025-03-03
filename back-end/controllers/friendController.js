const Friendship = require('../models/Friendship');
const User = require('../models/user'); // Thay thế bằng đường dẫn đúng tới file model User


// POST /api/friends/request
exports.sendFriendRequest = async (req, res) => {
    try {
        const requesterId = req.userId; // ID người gửi yêu cầu
        const { recipientId } = req.body;
        // Kiểm tra nếu đã có yêu cầu kết bạn
        const existingRequest = await Friendship.findOne({
            requester: requesterId,
            recipient: recipientId
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        const friendship = new Friendship({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });
        
        await friendship.save();
        res.status(201).json({ message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// POST /api/friends/accept
exports.acceptFriendRequest = async (req, res) => {
    try {
        const { requesterId } = req.body;
        const recipientId = req.userId;

        const friendship = await Friendship.findOneAndUpdate(
            { requester: requesterId, recipient: recipientId, status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        if (!friendship) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// DELETE /api/friends/reject
exports.rejectFriendRequest = async (req, res) => {
    try {
        const { requesterId } = req.body;
        const recipientId = req.userId;

        const friendship = await Friendship.findOneAndDelete({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });

        if (!friendship) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        res.status(200).json({ message: 'Friend request rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// DELETE /api/friends/remove
exports.removeFriend = async (req, res) => {
    try {
        const userId = req.userId;
        const { friendId } = req.body;

        const friendship = await Friendship.findOneAndDelete({
            $or: [
                { requester: userId, recipient: friendId, status: 'accepted' },
                { requester: friendId, recipient: userId, status: 'accepted' }
            ]
        });

        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        res.status(200).json({ message: 'Friend removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// GET /api/friends/list
exports.getFriendsList = async (req, res) => {
    try {
        const userId = req.userId; // ID của người dùng hiện tại từ middleware xác thực

        // Tìm kiếm tất cả các mối quan hệ bạn bè có trạng thái 'accepted' với userId
        const friendships = await Friendship.find({
            $or: [
                { requester: userId, status: 'accepted' },
                { recipient: userId, status: 'accepted' }
            ]
        });

        // Lấy danh sách ID của bạn bè
        const friendIds = friendships.map(friendship => 
            friendship.requester.toString() === userId.toString() ? friendship.recipient : friendship.requester
        );

        // Truy vấn để lấy thông tin chi tiết của bạn bè
        const friends = await User.find({ _id: { $in: friendIds } }).select('username email name avatar');

        res.status(200).json(friends);
    } catch (error) {
        console.error("Error fetching friends list:", error); // Log lỗi chi tiết ra console
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};


exports.getSentRequests = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ middleware xác thực

        // Tìm tất cả yêu cầu kết bạn mà user hiện tại đã gửi
        const sentRequests = await Friendship.find({ 
            recipient: userId
        }).populate('recipient', 'username email avatar').populate('requester', 'username email avatar'); // Populate thêm thông tin của recipient

        res.status(200).json(sentRequests);
    } catch (error) {
        console.error('Error fetching sent friend requests:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


