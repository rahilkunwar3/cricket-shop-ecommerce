require('dotenv').config();  // ← MUST be at the very top
const nodemailer = require('nodemailer');
const path = require('path');

// Log to verify credentials are loaded (remove after testing)
console.log('EMAIL_USER loaded:', process.env.EMAIL_USER ? '✅ Yes' : '❌ No');
console.log('EMAIL_PASS loaded:', process.env.EMAIL_PASS ? '✅ Yes' : '❌ No');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (email, otp, name) => {
    const logoPath = path.join(__dirname, '../public/images/rahil_cricket_shop_logo.png');

    const mailOptions = {
        from: `"RAHIL CRICKET SHOP" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Email for RAHIL CRICKET SHOP",
        attachments: [
            {
                filename: 'logo.png',  
                path: logoPath,
                cid: 'logo' // same cid value as in the html img src
            }
        ],
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #007bff;">Welcome to RAHIL CRICKET SHOP 🏏</h2>
            <p>Hello ${name || 'User'},</p>
            <h3>Email Verification</h3>
            <p>Your OTP for email verification is:</p>
            <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 3px; border-radius: 8px;">
                ${otp}
            </div>
            <p>This OTP will expire in <strong>5 minutes</strong>.</p>
            <div style="margin-top: 20px; font-size: 12px; color: #777;">
                <p>If you did not request this email, please ignore it.</p>
                <p>Thank you for choosing RAHIL CRICKET SHOP! 🏏</p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Verification email sent to ' + email);
        return true;
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        return false;
    }
};

module.exports = { sendOTPEmail };