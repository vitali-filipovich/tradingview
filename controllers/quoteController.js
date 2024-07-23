const quoteService = require('../services/quoteService');
const logger = require('../utils/logger');

const getQuotes = async (req, res, next) => {
    try {
        const quotes = await quoteService.getQuotesWithFavoriteSymbols();
        res.json(quotes);
        logger.info('Successfully responded with quotes');
    } catch (error) {
        logger.error('Error in getQuotes controller', error);
        next(error);
    }
};

module.exports = {
    getQuotes
};
