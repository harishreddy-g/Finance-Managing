let transactions = [{ id: 1, category: "Food", Amount: 500, date: "01-02-2001" },
{ id: 2, category: "Movie", Amount: 1000, date: "01-03-2001" }
];
let currentID = 3;


const Transaction = require('../models/Transaction');



// exports.getTransactions = function (req, res) {
//     res.json({
//         success: true,
//         data: transactions,
//         message: "Transactions fetched successfully."
//     });
// };

exports.getTransactions = async function (req, res) {
    const transactions = await Transaction.find();
    res.status(200).json({
        success: true,
        data: transactions,
        message: "transaction fetched successfully"
    });
};

// exports.addTransactions = function (req, res) {
//     const newTransaction = {
//         id: currentID++,
//         category: req.body.category,
//         amount: req.body.amount,
//         date: req.body.date
//     };

//     if (!newTransaction.category || !newTransaction.amount || !newTransaction.date) {
//         return res.status(400).json({
//             success: false,
//             message: " invalid fields!!"
//         });
//     }
//     transactions.push(newTransaction);
//     res.status(201).json({
//         success: true,
//         data: newTransaction,
//         message: "new Transation added successfully"
//     });
// };

exports.addTransactions = async function (req, res) {
    const { category, amount, date } = req.body;

    if (!category || !amount || !date) {
        return res.status(400).json({
            success: false,
            message: "Invalid fields"
        });
    }
    const newTransaction = new Transaction({
        category, amount, date
    });
    await newTransaction.save();

    res.status(200).json({
        success: true,
        data: newTransaction,
        message: "Transaction added successfuly"
    });
};

exports.deleteTransactions = function (req, res) {
    const id = parseInt(req.params.id);

    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Transaction not found ."
        });
    }

    transactions.splice(index, 1);
    res.json({
        success: true,
        message: "Transaction deleted successfully."
    });
};
exports.updateTransactions = function (req, res) {
    const id = parseInt(req.params.id);

    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Transaction not found"
        });
    }

    const updatedData = req.body;

    if (!updatedData.category || !updatedData.amount || !updatedData.date) {
        return res.status(400).json({
            success: false,
            message: "Invalid fields"
        });
    }

    transactions[index] = {
        id: id,
        category: updatedData.category,
        amount: updatedData.amount,
        date: updatedData.date
    };

    res.json({
        success: true,
        data: transactions[index],
        message: "Transaction updated successfully"
    });
};