const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar:{type:String},
    privacy: {
        type: String,
        enum: ['public', 'private', 'closed'],
        default: 'public'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', groupSchema);
