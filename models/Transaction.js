const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    date: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;