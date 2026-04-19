const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const transactionController = require('../controllers/transactionsControllers');

router.get('/', protect, transactionController.getTransactions);
router.post('/', protect, transactionController.addTransactions);
router.delete('/:id', protect, transactionController.deleteTransactions);
router.put('/:id', protect, transactionController.updateTransactions);





module.exports = router;