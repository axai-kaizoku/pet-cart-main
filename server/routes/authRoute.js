const express = require('express');
const {
	sigupController,
	loginController,
} = require('../controllers/authController');
// router object
const router = express.Router();

// routing

// Register || Method POST
router.post('/signup', sigupController);

// Login || POST
router.post('/login', loginController);

module.exports = router;
