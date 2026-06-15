const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true, lowercase:true, trim:true, match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']},
    password:{type:String, required:true, match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character'
        ]},
    name:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('User', userSchema);