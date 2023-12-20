const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
	createCategoryController,
	updateCategoryController,
	categoryController,
	singleCategoryController,
	deleteCategoryController,
} = require('../controllers/categoryController');
const router = express.Router();

// routes
// create category
router.post(
	'/create-category',
	requireSignIn,
	isAdmin,
	createCategoryController,
);

// update category
router.put(
	'/update-category/:id',
	requireSignIn,
	isAdmin,
	updateCategoryController,
);

// getAll categories
router.get('/get-categories', categoryController);

// single category
router.get('/get-category/:slug', singleCategoryController);

// delete category
router.delete(
	'/delete-category/:id',
	requireSignIn,
	isAdmin,
	deleteCategoryController,
);

module.exports = router;
