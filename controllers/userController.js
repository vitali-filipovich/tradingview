const userService = require('../services/userService');
const logger = require('../utils/logger');

const getFavoriteSymbols = async (req, res, next) => {
    try {
        const favorites = await userService.getFavoriteSymbols();

        logger.info('Successfully responded with favorites');
        res.json(favorites);
    } catch (error) {
        logger.error('Error in getFavoriteSymbols controller', error);
        next(error);
    }
};

const addFavoriteSymbol = async (req, res, next) => {
    const { symbol } = req.body;

    try {
        logger.info(`Received request to add favorite: ${symbol}`);

        await userService.addFavoriteSymbol(symbol);

        logger.info(`Successfully added favorite: ${symbol}`);
        res.json({ message: 'Favorite symbols added' });

    } catch (error) {
        logger.error(`Error in addFavoriteSymbol controller for symbol: ${symbol}`, error);

        if (error.message === 'Symbol already exists in favorites') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const removeFavoriteSymbol = async (req, res, next) => {
    const { symbol } = req.params;

    try {
        logger.info(`Received request to remove favorite: ${symbol}`);

        await userService.removeFavoriteSymbol(symbol);
        logger.info(`Successfully removed favorite: ${symbol}`);

        res.json({ message: 'Favorite removed' });
    } catch (error) {
        logger.error(`Error in removeFavoriteSymbol controller for symbol: ${symbol}`, error);
        next(error);
    }
};

module.exports = {
    getFavoriteSymbols,
    addFavoriteSymbol,
    removeFavoriteSymbol
};
