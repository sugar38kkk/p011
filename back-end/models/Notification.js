// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    type: { type: String, required: true }, 
    message: { type: String, required: true }, 
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }, 
    isRead: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
