const mongoose = require('mongoose');

const adminInfo = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // For normal signups
});

module.exports = mongoose.model('adminInfo', adminInfo);
