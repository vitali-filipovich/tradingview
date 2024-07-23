const express = require('express');
const userController = require('../controllers/userController');
const validateRequest = require('../utils/validateRequest');
const { validateFavorite } = require('../validators/userValidator');

const router = express.Router();

router.get('/favorites', userController.getFavoriteSymbols);
router.post('/favorites', validateFavorite, validateRequest, userController.addFavoriteSymbol);
router.delete('/favorites/:symbol', userController.removeFavoriteSymbol);

module.exports = router;
