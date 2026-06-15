const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricketshop'
        await mongoose.connect(mongoURI); 
            console.log('MongoDB Connected');
    } catch (error) {
            console.error('MongoDB Connection Error:', error);
           
            // Don't exit process in Docker
           if (process.env.NODE_ENV !== 'production'){
             process.exit(1);
            }
        }
};

module.exports = connectDB;