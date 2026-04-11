const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
/* 

const transactions = [
    { category: "Food", amount: 200, date: "2023-06-01" },
    { category: "Transport", amount: 50, date: "2023-06-02" },
    { category: "Entertainment", amount: 100, date: "2023-06-03" }
];


});
app.get('/transactions', function (req, res) {
    res.json({
        success: true,
        data: transactions,
        message: "Transactions fetched successfully"

    });
});
app.post('/transactions', function (req, res) {
    const newTransaction = req.body;
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.date) {
        return res.status(400).json({
            success: false,
            message: "Invalid fields"
        });
    }
    transactions.push(newTransaction);
    res.status(201).json({
        success: true,
        data: newTransaction,
        message: "Transactions added successfully"
    });
});
*/


mongoose.connect("mongodb://localhost:27017/FinanceDB").then(function(req,res){
    console.log("Data base server connected successfully");
})
.catch(function(err){
    console.log("connection error: "+ err);
});


const transactionRoutes = require('./routes/transactions');

app.use('/transactions', transactionRoutes);

app.get('/', function (req, res) {
    res.send("Server is running successfully");
});


app.listen(3000, function () {
    console.log("server is running on port 3000");
    console.log("transactions link: http://localhost:3000/transactions");
});