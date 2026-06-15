const mongoose = require('mongoose');
const User = require('../models/user');
const OTP = require('../models/otp');
const otpGenerator = require('otp-generator');
const { sendOTPEmail } = require('../config/email');

// Generate and send OTP to user's email
const sendOTP = async (req, res) => {
    try{

        const {email, name} = req.body;
    
        // Check if email is already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email already exists'});
        }
    
        // Generate OTP
    
        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, digits: true });
    
        // Save OTP to database
        await OTP.findOneAndDelete({email: email.toLowerCase()}); // Delete existing OTP for the email
        const newOTP = new OTP({email: email.toLowerCase(), otp: otp, attempts: 0}); // Create new OTP document
        await newOTP.save();
    
        // Send email with OTP
    
        const emailSent = await sendOTPEmail(email, otp, name);
        if(emailSent){
            res.status(200).json({message:'OTP sent to email successfully'});
        } else {
            res.status(500).json({message:'Failed to send OTP email'});
        }

    } catch(error){
        console.error('Error in sendOTP:', error);
        res.status(500).json({message:'Server error'});
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try{
        const {email, otp} = req.body;
        const otpRecord = await OTP.findOne({email: email.toLowerCase()});

        if(!otpRecord){
            return res.status(400).json({message:'OTP not found for this email'});
        }

        // Check attempts (5 attempts allowed)
        if(otpRecord.attempts >= 5){
            await OTP.findOneAndDelete({email: email.toLowerCase()}); // Delete OTP after max attempts
            return res.status(400).json({message:'Maximum OTP verification attempts exceeded. Please request a new OTP.'});
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1; // Increment attempts
            await otpRecord.save();
            return res.status(400).json({message:'Invalid OTP. Please try again.'});
        }

        // Mark as verified 
        otpRecord.isVerified = true;
        await otpRecord.save();
        res.status(200).json({message:'OTP verified successfully'});

    } catch(error){
        console.error('Error in verifyOTP:', error);
        res.status(500).json({message:'Server error'});
    }
};

// Resend OTP
const resendOTP = async (req, res) => {
    try{
        const {email, name} = req.body;

        // Generate new OTP
        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, digits: true });

        // Update OTP in database
        await OTP.findOneAndDelete({email: email.toLowerCase()}); // Delete existing OTP for the email
        const newOTP = new OTP({email: email.toLowerCase(), otp: otp, attempts: 0}); // Create new OTP document
        await newOTP.save();

        // Send new OTP email
        const emailSent = await sendOTPEmail(email, otp, name);
        if(emailSent){
            res.status(200).json({message:'New OTP sent to email successfully'});
        } else {
            res.status(500).json({message:'Failed to send new OTP email'});
        }

    } catch(error){
        console.error('Error in resendOTP:', error);
        res.status(500).json({message:'Server error'});
    }
};

module.exports = {sendOTP, verifyOTP, resendOTP};