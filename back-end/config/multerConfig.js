// config/multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'your_folder_name', // Tên thư mục trong Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'] // Định dạng được chấp nhận
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
