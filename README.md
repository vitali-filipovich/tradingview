# TradingView Application

## Description

This is a Node.js application for fetching and displaying quotes from the Binance API with a specified spread of 5%. Users can add and remove quotes to favorites. The application supports MongoDB for storing the list of favorite symbols.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/username/tradingview.git
cd tradingview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project by copying the content from `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file and add your parameters (although it is not necessary as the `.env.example` contains a working connection path):

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/tradingview?retryWrites=true
PORT=3001
BINANCE_API=https://testnet.binancefuture.com/fapi/v1/ticker/price
```

### 4. Run migrations

Run the migrations to set up initial data and indexes in the database:

```bash
npm run migrate
```

### 5. Start the server

To start the server, use the command:

```bash
npm run start
```

The server will start on the port specified in the `.env` file (default is `3001`). Open `http://localhost:3001` in your browser to see the quotes webpage.

### 6. Lint the code

To check the code with ESLint, use the command:

```bash
npm run lint
```

To automatically fix linting errors, use:

```bash
npm run lint:fix
```

### 7. Run tests

To run the tests, use the command:

```bash
npm run test
```

### Project Structure

```
tradingview-app/
├── config/
│   └── config.js
├── controllers/
│   └── userController.js
│   └── quoteController.js
├── models/
│   └── userFavoriteModel.js
├── routes/
│   └── userRoutes.js
│   └── quoteRoutes.js
├── services/
│   └── userService.js
│   └── quoteService.js
├── validators/
│   └── userValidator.js
├── utils/
│   └── logger.js
│   └── errorHandler.js
│   └── validateRequest.js
├── migrations/
│   └── initialMigration.js
├── tests/
│   └── quoteService.test.js
│   └── userService.test.js
├── .env
├── .env.example
├── .eslintrc.json
├── package.json
├── server.js
└── index.html
```

### Usage Example

After starting the server, open `http://localhost:3001` in your browser. You will see a list of quotes, each with ask and bid prices. You can add a quote to favorites by clicking the "Add to Favorites" button. Favorite quotes will appear at the top of the list and be marked with a yellow background. You can also remove a quote from favorites by clicking the "Remove from Favorites" button.

## Graceful Shutdown

The server is configured for a graceful shutdown. When receiving `SIGTERM` or `SIGINT` signals (e.g., stopping the server with `Ctrl+C`), the server will correctly close all active connections and disconnect from the database.

## Logs

Logs are stored in the `logs` directory in the root of the project:
- `info.log`: for informational messages
- `error.log`: for error messages

## Conclusion

This README file includes all necessary steps to clone, set up, and run your project, as well as information on migrations, linting, and testing. It will help new developers quickly get started with the project.
```

This README provides a comprehensive guide for setting up and running the project, ensuring new developers can get started quickly and efficiently.