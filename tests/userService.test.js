const userService = require('../services/userService');
const UserFavorite = require('../models/userFavoriteModel');

jest.mock('../models/userFavoriteModel');

describe('userService', () => {
    test('getFavoriteSymbols should return an array of favorites symbols', async () => {
        const mockFavorites = [{ symbol: 'BTCUSDT' }];
        UserFavorite.find.mockResolvedValue(mockFavorites);

        const favorites = await userService.getFavoriteSymbols();
        expect(favorites).toEqual(mockFavorites);
    });

    test('addFavoriteSymbol should call model with correct parameters', async () => {
        const symbol = 'BTCUSDT';
        UserFavorite.findOne.mockResolvedValue(null);
        UserFavorite.prototype.save.mockResolvedValue({ symbol });

        const favorite = await userService.addFavoriteSymbol(symbol);

        expect(UserFavorite.findOne).toHaveBeenCalledWith({ symbol });
        expect(favorite.symbol).toBe(symbol);
    });

    test('addFavoriteSymbol should throw an error if symbol already exists', async () => {
        const symbol = 'BTCUSDT';
        UserFavorite.findOne.mockResolvedValue({ symbol });

        await expect(userService.addFavoriteSymbol(symbol)).rejects.toThrow('Symbol already exists in favorites');
    });

    test('removeFavoriteSymbol should call model with correct parameters', async () => {
        const symbol = 'BTCUSDT';
        UserFavorite.deleteOne.mockResolvedValue({ deletedCount: 1 });

        const result = await userService.removeFavoriteSymbol(symbol);

        expect(UserFavorite.deleteOne).toHaveBeenCalledWith({ symbol });
        expect(result.deletedCount).toBe(1);
    });
});
