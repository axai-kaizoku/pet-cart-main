const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
	createProductController,
	getProductController,
	getSingleProductController,
	productPhotoController,
	deleteProductController,
	updateProductController,
	productFilterController,
	productCountController,
	productListController,
	searchProductController,
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

//filter product
router.post('/filter-product', productFilterController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//product search
router.get('/search/:keyword', searchProductController);

module.exports = router;
