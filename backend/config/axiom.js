// config/axiom.js
const winston = require('winston');

// Different import syntax based on the package version
let AxiomTransport;
try {
    // Try ES6 import style (for newer versions)
    const axiomModule = require('@axiomhq/winston');
    AxiomTransport = axiomModule.WinstonTransport || axiomModule.default?.WinstonTransport;
} catch (error) {
    // Try older style
    AxiomTransport = require('@axiomhq/winston').WinstonTransport;
}

// If still not working, create a simple file logger instead
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        // Console transport (always works)
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        // File transport (alternative to Axiom)
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
        })
    ]
});

// If Axiom transport loaded successfully, add it
if (AxiomTransport && process.env.AXIOM_TOKEN) {
    try {
        const axiomTransport = new AxiomTransport({
            dataset: process.env.AXIOM_DATASET || 'cricket-shop-backend',
            token: process.env.AXIOM_TOKEN,
        });
        logger.add(axiomTransport);
        console.log('✅ Axiom logging enabled');
    } catch (error) {
        console.log('⚠️ Axiom not configured, using file logging only');
    }
} else {
    console.log('📝 Using file logging (Axiom not configured)');
}

module.exports = logger;