const ProductModel = require('../models/productModel');
const fs = require('fs');

const createProductController = async (req, res) => {
	try {
		const products = await ProductModel;
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in creating product',
			error,
		});
	}
};

module.exports = { createProductController };
