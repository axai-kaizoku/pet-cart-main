const productModel = require('../models/productModel');
const fs = require('fs');
const slugify = require('slugify');

const createProductController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } =
			req.fields;
		const { image } = req.files;

		//validation
		switch (true) {
			case !name:
				return res.status(500).send({ message: 'Name is required' });
			case !description:
				return res.status(500).send({ message: 'Description is required' });
			case !price:
				return res.status(500).send({ message: 'Price is required' });
			case !category:
				return res.status(500).send({ message: 'Category is required' });
			case !quantity:
				return res.status(500).send({ message: 'Quantity is required' });
			case !image && image.size > 100000:
				return res
					.status(500)
					.send({ message: 'Image is required and should be less than 1mb' });
		}
		const products = new productModel({ ...req.fields, slug: slugify(name) });
		if (image) {
			products.image.data = fs.readFileSync(image.path);
			products.image.contentType = image.type;
		}
		await products.save();
		res.status(201).send({
			success: true,
			message: 'Product created successfully!',
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in creating product',
			error,
		});
	}
};

const getProductController = async (req, res) => {
	try {
		const products = await productModel
			.find({})
			.populate('category')
			.select('-photo')
			.limit(12)
			.sort({
				createdAt: -1,
			});
		res.status(200).send({
			success: true,
			productCount: products.length,
			message: 'Fetched all products',
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in fetching products',
			error,
		});
	}
};

const getSingleProductController = async (req, res) => {
	try {
		const product = await productModel
			.findOne({ slug: req.params.slug })
			.select('-image')
			.populate('category');
		res.status(200).send({
			success: true,
			message: 'Product Fetched!',
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in fetching product',
		});
	}
};

const productPhotoController = async (req, res) => {
	try {
		const product = await productModel.findById(req.params.pid).select('image');
		if (product.image.data) {
			res.set('Content-type', product.image.contentType);
			return res.status(200).send(product.image.data);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in fetching product image',
		});
	}
};

const deleteProductController = async (req, res) => {
	try {
		await productModel.findByIdAndDelete(req.params.pid).select('-image');
		res.status(200).send({
			success: true,
			message: 'Product deleted successfully!',
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error while deleting product ',
			error,
		});
	}
};

const updateProductController = async (req, res) => {
	try {
		const { name, description, price, category, quantity, shipping } =
			req.fields;
		const { image } = req.files;
		//alidation
		switch (true) {
			case !name:
				return res.status(500).send({ error: 'Name is Required' });
			case !description:
				return res.status(500).send({ error: 'Description is Required' });
			case !price:
				return res.status(500).send({ error: 'Price is Required' });
			case !category:
				return res.status(500).send({ error: 'Category is Required' });
			case !quantity:
				return res.status(500).send({ error: 'Quantity is Required' });
			case image && image.size > 1000000:
				return res
					.status(500)
					.send({ error: 'photo is Required and should be less then 1mb' });
		}

		const products = await productModel.findByIdAndUpdate(
			req.params.pid,
			{ ...req.fields, slug: slugify(name) },
			{ new: true },
		);
		if (image) {
			products.image.data = fs.readFileSync(image.path);
			products.image.contentType = image.type;
		}
		await products.save();
		res.status(201).send({
			success: true,
			message: 'Product Updated Successfully',
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: 'Error in Updating product',
		});
	}
};

module.exports = {
	createProductController,
	getProductController,
	getSingleProductController,
	productPhotoController,
	deleteProductController,
	updateProductController,
};
