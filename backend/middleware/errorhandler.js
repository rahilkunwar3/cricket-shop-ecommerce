const logger = require('../config/axiom')

const errorHandler = (err, req, res, next) => {
    // Log to Axiom/file
    logger.error({
        message: err.message,
        stack: err.stack,
        code: err.code,
        name: err.name,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userId: req.userId,
        statusCode: err.statusCode || 500
    });


    if (err.code === 11000){
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            message: `${field} already exists`,
            field: field
        });
    }

    if (err.name === 'ValidationError'){
        const errors = err.errors ? Object.values(err.errors).map(e => e.message): ['Validating failed'];
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    if (err.name === 'JsonWebTOkenError'){
        return res.status(401).json({message: 'Invalid token'});
    }

    if (err.name === 'TokenExpiredError'){
        return res.status(401).json({message: 'Token expired'})
    }

    if (err.name === 'CastError'){
        return res.status(400).json({message: 'Invalid ID format'})
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;