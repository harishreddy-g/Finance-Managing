// let transactions = [{ id: 1, category: "Food", Amount: 500, date: "01-02-2001" },
// { id: 2, category: "Movie", Amount: 1000, date: "01-03-2001" }
// ];
// let currentID = 3;


const Transaction = require('../models/Transaction');
const user = require('../models/user');



// exports.getTransactions = function (req, res) {
//     res.json({
//         success: true,
//         data: transactions,
//         message: "Transactions fetched successfully."
//     });
// };

exports.getTransactions = async function (req, res) {
    try {
        const category = req.query.category;
        const filter = { user: req.user.id };
        if (category) {
            filter.category = category;
        }
        const transactions = await Transaction.find(filter);

        res.status(200).json({
            success: true,
            data: transactions,
            message: "transaction fetched successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

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
    try {
        const newTransaction = await Transaction.create({
            ...req.body,
            user: req.user.id
        });
        await newTransaction.save();

        res.status(200).json({
            success: true,
            data: newTransaction,
            message: "Transaction added successfuly"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })

    }
};
exports.deleteTransactions = async function (req, res) {
    try {
        const id = req.params.id;

        const deleted = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};
exports.updateTransactions = async function (req, res) {
    try {
        const id = req.params.id;

        const updated = await Transaction.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.json({
            success: true,
            data: updated,
            message: "Transaction updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};