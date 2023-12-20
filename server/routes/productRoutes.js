const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();

// routes
router.post(
	'/create-product',
	requireSignIn,
	isAdmin,
	formidable(),
	createProductController,
);

module.exports = router;
