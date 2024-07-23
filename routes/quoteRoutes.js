const express = require('express');
const quoteController = require('../controllers/quoteController');
const router = express.Router();

router.get('/quotes', quoteController.getQuotes);

module.exports = router;
