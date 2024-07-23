const UserFavorite = require('../models/userFavoriteModel');

const getFavoriteSymbols = async () => {
    return await UserFavorite.find();
};

const addFavoriteSymbol = async (symbol) => {
    const existingFavorite = await UserFavorite.findOne({ symbol });

    if (existingFavorite) {
        throw new Error('Symbol already exists in favorites');
    }

    const favorite = new UserFavorite({ symbol });
    return await favorite.save();
};

const removeFavoriteSymbol = async (symbol) => {
    return await UserFavorite.deleteOne({ symbol });
};

module.exports = {
    getFavoriteSymbols,
    addFavoriteSymbol,
    removeFavoriteSymbol
};
