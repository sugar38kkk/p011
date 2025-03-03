const User = require('../models/user');
// api check admin
const adminMiddleware = async (req, res, next) => {
    try {
        const userId = req.userId; // Lấy userId từ token hoặc middleware xác thực

        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // Cho phép tiếp tục nếu là admin
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports = adminMiddleware;