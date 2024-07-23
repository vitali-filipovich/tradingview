require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 3001,
    binanceAPI: process.env.BINANCE_API || 'https://testnet.binancefuture.com/fapi/v1/ticker/price'
};