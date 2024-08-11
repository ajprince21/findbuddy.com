const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    settings: {
        allowFollowRequests: { type: Boolean, default: true },
        allowProfileView: { type: Boolean, default: true },
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
