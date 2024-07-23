const quoteService = require('../services/quoteService');
const axios = require('axios');
const UserFavorite = require('../models/userFavoriteModel');

jest.mock('axios');
jest.mock('../models/userFavoriteModel');

describe('quoteService', () => {
    test('calculatePrices should correctly calculate ask and bid prices', () => {
        const price = 100;
        const expected = {
            ask: 105,
            bid: 95
        };
        expect(quoteService.calculatePrices(price)).toEqual(expected);
    });

    test('getQuotesWithFavorites should return quotes with favorites on top', async () => {
        const prices = [
            { symbol: 'BTCUSDT', price: 100 },
            { symbol: 'ETHUSDT', price: 200 },
            { symbol: 'BNBUSDT', price: 300 }
        ];
        axios.get.mockResolvedValue({ data: prices });

        const favorites = [
            { symbol: 'ETHUSDT' }
        ];
        UserFavorite.find.mockResolvedValue(favorites);

        const quotes = await quoteService.getQuotesWithFavoriteSymbols();
        expect(quotes[0].symbol).toBe('ETHUSDT');
        expect(quotes[0].isFavorite).toBe(true);
    });
});
