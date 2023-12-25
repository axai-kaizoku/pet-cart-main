const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
	createProductController,
	getProductController,
	getSingleProductController,
	productPhotoController,
	deleteProductController,
	updateProductController,
	productCountController,
	productListController,
	searchProductController,
	productCategoryController,
	brainTreeTokenController,
	brainTreePaymentController,
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
router.delete('/delete-product/:pid', deleteProductController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//product search
router.get('/search/:keyword', searchProductController);

// category wise
router.get('/product-category/:slug', productCategoryController);

// payments routes

//token
router.get('/braintree/token', brainTreeTokenController);

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);

module.exports = router;
