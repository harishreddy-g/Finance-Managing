const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const transactionController = require('../controllers/transactionsControllers');

router.get('/', transactionController.getTransactions);
router.post('/', transactionController.addTransactions);
router.delete('/:id', transactionController.deleteTransactions);
router.put('/:id', transactionController.updateTransactions);





module.exports = router;