const mongoose = require('mongoose');

const userFavoriteSchema = new mongoose.Schema({
    symbol: { type: String, required: true, unique: true }
});

userFavoriteSchema.index({ symbol: 1 });

const UserFavorite = mongoose.model('UserFavorite', userFavoriteSchema);

module.exports = UserFavorite;
