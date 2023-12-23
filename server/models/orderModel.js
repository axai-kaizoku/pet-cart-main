const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		products: [
			{
				type: mongoose.ObjectId,
				ref: 'Product',
			},
		],
		payment: {},
		buyer: {
			type: mongoose.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			default: 'Processing',
			enum: [
				'Processing',
				'Confirmed',
				'Shipped',
				'Out for delivery',
				'Cancel',
			],
		},
	},
	{ timestamps: true },
);

const order = mongoose.model('Order', orderSchema);

module.exports = order;
