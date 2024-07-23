const logger = require('./logger');

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode);
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
};

module.exports = {
    notFound,
    errorHandler
};
