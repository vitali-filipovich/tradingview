const mongoose = require('mongoose');
const config = require('../config/config');
const UserFavorite = require('../models/userFavoriteModel');
const logger = require('../utils/logger');

const runMigration = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        logger.info('MongoDB connected for migration');

        const indexName = 'symbol_1';
        const indexes = await UserFavorite.listIndexes();

        const indexExists = indexes.some(index => index.name === indexName);

        if (!indexExists) {
            await UserFavorite.createIndex({ symbol: 1 }, { unique: true });
            logger.info('Index created for UserFavorite');
        } else {
            logger.info('Index already exists for UserFavorite');
        }

        const initialFavoriteSymbols = [
            { symbol: 'BTCUSDT' },
            { symbol: 'ETHUSDT' },
            { symbol: 'BNBUSDT' }
        ];

        try {
            await UserFavorite.insertMany(initialFavoriteSymbols, { ordered: false });
            logger.info('Initial favorite symbols added');
        } catch (err) {
            if (err.code === 11000) {
                logger.info('Some initial favorite symbols already exist');
            } else {
                throw err;
            }
        }

        logger.info('Migration completed');
    } catch (err) {
        logger.error('Migration error', err);
        throw err;
    }
};

runMigration().catch(err => {
    logger.error('Migration error', err);
    throw new Error('Migration failed');
});
