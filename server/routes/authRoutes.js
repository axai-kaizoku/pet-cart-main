const express = require('express');
const {
	sigupController,
	loginController,
	forgotPasswordController,
	updateProfileController,
	getOrdersController,
	getAllOrdersController,
	orderStatusController,
	getAllUsersController,
} = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// routing

// Register || Method POST
router.post('/signup', sigupController);

// Login || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// Profile || GET protected route
router.get('/profile', requireSignIn, (req, res) => {
	res.status(200).send({ ok: true });
});

// Admin || GET protected route
router.get('/admin', requireSignIn, isAdmin, (req, res) => {
	res.status(200).send({ ok: true });
});

// update profile
router.put('/update-profile', requireSignIn, updateProfileController);

// orders
router.get('/orders', requireSignIn, getOrdersController);

// all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// order status change
router.put('/order-status/:id', requireSignIn, isAdmin, orderStatusController);

// all users
router.get('/users', requireSignIn, isAdmin, getAllUsersController);

module.exports = router;
