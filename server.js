const express = require('express');
const app = express();

const transactions = [
    { category: "Food", amount: 200, date: "2023-06-01" },
    { category: "Transport", amount: 50, date: "2023-06-02" },
    { category: "Entertainment", amount: 100, date: "2023-06-03" }
];

app.get('/', function (req, res) {
    res.send("Server is running");
});
app.get('/transactions', function (req, res) {
    res.json(transactions);
});
app.listen(3000, function () {
    console.log("server is running on port 3000");
    console.log("transactions link: http://localhost:3000/transactions");
});