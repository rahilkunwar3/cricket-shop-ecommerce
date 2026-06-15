const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email : { type: String, required: true },
    otp : { type: String, required: true },
    isVerified : { type: Boolean, default: false },
    attempts : { type: Number, default: 0 },
    createdAt : { type: Date, default: Date.now, expires: 300 } // OTP expires after 5 minutes
})

module.exports = mongoose.model('OTP', otpSchema);