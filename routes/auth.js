const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/profile', protect, authController.getProfile);
router.put('/budget', protect, authController.updateBudget);

module.exports = router;