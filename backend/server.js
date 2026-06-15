require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middleware/errorhandler')

const webapp = express();

// MongoDB connection
connectDB();

// Middleware
webapp.use(express.json());
webapp.use(cors());
webapp.use(morgan('dev'))


// Routes
webapp.use('/api', authRoutes);
webapp.use('/api/tasks', taskRoutes);
webapp.use('/api/products', productRoutes);
webapp.use('/api/cart', cartRoutes);
webapp.use('/api/otp', otpRoutes); 

webapp.use(errorHandler);


const PORT = process.env.PORT || 3001;
webapp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});