const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    visibility: {
        type: String,
        enum: ['public', 'private', 'friends','group'],
        default: 'public'
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // ID nhóm (nếu là bài đăng trong nhóm),
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
