const winston = require('winston');
const path = require('path');

const logsDirectory = path.join(__dirname, '..', 'logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logsDirectory, 'info.log'), level: 'info' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' })
    ],
});

module.exports = logger;
