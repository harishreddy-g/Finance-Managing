const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }
}, { timeseries: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;