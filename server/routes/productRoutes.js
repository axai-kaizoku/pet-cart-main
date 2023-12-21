const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
	createProductController,
	getProductController,
	getSingleProductController,
	productPhotoController,
	deleteProductController,
	updateProductController,
} = require('../controllers/productController');
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

router.put(
	'/update-product/:pid',
	requireSignIn,
	isAdmin,
	formidable(),
	updateProductController,
);

//get products
router.get('/get-products', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

//get product image
router.get('/product-image/:pid', productPhotoController);

//delete product
router.delete('/product/:pid', deleteProductController);

module.exports = router;
