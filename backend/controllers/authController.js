const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OTP = require('../models/otp');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordregex.test(password);
}

const validateName = (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 50;
}

const nameRegex = /^[a-zA-Z\s]+$/;
const validateNameFormat = (name) => {
    return nameRegex.test(name.trim());
}


const register = asyncHandler(async (req, res) => {
    const { email, password, name, otpCode } = req.body;

    // Just throw errors - asyncHandler will catch them
    if (!validateName(name)) {
        throw new Error('Name must be between 2 and 50 characters');
    }

    if (!validateNameFormat(name)) {
        throw new Error('Name can only contain letters and spaces');
    }

    if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
    }

    if(!validatePassword(password)){
        throw new Error('Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Verify OTP if provided
    if (otpCode) {
        const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
        
        if (!otpRecord) {
            throw new Error('OTP not found for this email');
        }
        
        if (otpRecord.otp !== otpCode) {
            throw new Error('Invalid OTP');
        }
        
        if (!otpRecord.isVerified) {
            throw new Error('OTP not verified. Please verify your email first.');
        }
        
        // Delete OTP after successful verification
        await OTP.findOneAndDelete({ email: email.toLowerCase() });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim()
    });
    await user.save();

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
    );
    
    res.status(201).json({
        token,
        user: { id: user._id, email: user.email, name: user.name }
    });
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // ✅ Check if user exists
    if (!user) {
        throw new Error('Invalid Email or Password');
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid Email or Password');
    }

    // Generate token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
    );
    
    res.json({
        token,
        user: { id: user._id, email: user.email, name: user.name }
    });
});

module.exports = { register, login };