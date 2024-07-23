const axios = require('axios');
const config = require('../config/config');
const userService = require('./userService');
const logger = require('../utils/logger');

const fetchPrices = async () => {
    try {
        const response = await axios.get(config.binanceAPI);
        const prices = response?.data;

        logger.info('Successfully fetched prices from Binance API');
        return prices;
    } catch (error) {
        logger.error('Error fetching prices from Binance API', error);
        throw new Error('Error fetching prices from Binance API');
    }
};

const calculatePrices = (price) => {
    const spread = 0.05;
    return {
        ask: price * (1 + spread),
        bid: price * (1 - spread)
    };
};

const getQuotesWithFavoriteSymbols = async () => {
    try {
        const [prices, favorites] = await Promise.all([
            fetchPrices(),
            userService.getFavoriteSymbols()
        ]);

        logger.info('Fetched prices and favorites from repository');

        const favoriteSymbols = new Set(favorites.map(fav => fav?.symbol));

        const quotes = prices.map(item => ({
            symbol: item.symbol,
            ...calculatePrices(parseFloat(item.price)),
            isFavorite: favoriteSymbols.has(item.symbol)
        }));

        quotes.sort((a, b) => b.isFavorite - a.isFavorite);

        return quotes;
    } catch (error) {
        logger.error('Error combining and sorting quotes with favorites', error);
        throw new Error('Error combining quotes');
    }
};

module.exports = {
    fetchPrices,
    calculatePrices,
    getQuotesWithFavoriteSymbols
};
