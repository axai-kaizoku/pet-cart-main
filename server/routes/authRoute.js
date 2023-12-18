const express = require('express');
const {
	sigupController,
	loginController,
	testController,
} = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// routing

// Register || Method POST
router.post('/signup', sigupController);

// Login || POST
router.post('/login', loginController);

// Profile || GET protected route
router.get('/profile', requireSignIn, (req, res) => {
	res.status(200).send({ ok: true });
});

// Test Route
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;
