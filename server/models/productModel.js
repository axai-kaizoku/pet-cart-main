const mongoose = require('mongoose');

// {
//   name: `Purina Natural Adult Dry Dog Food`,
//   description: `One (1) 36 lb. Bag - Purina ONE High Protein, Natural Dry Dog Food, True Instinct With Real Salmon & Tuna
//   Salmon is number 1 ingredient in this dry dog food with tuna to help deliver 30 percent protein that helps support strong muscles, including a healthy heart
//   Purina ONE natural dog food with added vitamins, minerals and nutrients crafted by a veterinarian-recommended brand in Purina-owned, U.S. facilities
//   100 percent nutrition for adult dogs, 0 percent fillers. Every ingredient has a purpose
//   Dry dog food for skin and coat care includes omega-6 fatty acids and natural sources of glucosamine for joint health for dogs plus four antioxidant sources to help support a strong immune system`,
//   price: 67.65,
//   image_url: `/assets/categories/dogs/food/purina.jpg`,
//   category: categories[0]._id,
//   subCategory: subCategories[0]._id,
//   quantity: 100,
// },

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: mongoose.ObjectId,
			ref: 'Category',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		shipping: {
			type: Boolean,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
