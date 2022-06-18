module.exports = (app) => {

    const transactions = require('../controllers/transactions.controller');

    app.get('/api/transactions/user/:userId', transactions.getAllTransactionsByUserId);
    app.get('/api/transactions/:transactionId', transactions.getTransactionById);
    app.get('/api/transactions/:transactionId/items', transactions.getItemsPurchasedByTransactionId);
    
    app.post('/api/transactions', transactions.createTransaction);
}
