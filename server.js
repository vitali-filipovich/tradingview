const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const quoteRoutes = require('./routes/quoteRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', quoteRoutes);
app.use('/api', userRoutes);

// Simple webpage for testing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(config.mongoURI)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => {
        logger.error('MongoDB connection error', err);
        throw new Error('MongoDB connection failed');
    });

// Start server
const server = app.listen(config.port, () => {
    logger.info(`Server is running on http://localhost:${config.port}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    logger.info(`Received signal to terminate: ${signal}`);
    server.close(() => {
        logger.info('Closed out remaining connections');
        mongoose.connection.close(() => {
            logger.info('MongoDB connection closed');
            throw new Error('Server shutdown gracefully');
        });
    });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
