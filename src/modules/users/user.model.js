const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['CUSTOMER', 'STAFF', 'ADMIN'], default: 'CUSTOMER' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
