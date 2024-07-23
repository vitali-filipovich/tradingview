const { body } = require('express-validator');

const validateFavorite = [
    body('symbol').isString().notEmpty().withMessage('Symbol is required and should be a string')
];

module.exports = {
    validateFavorite
};
