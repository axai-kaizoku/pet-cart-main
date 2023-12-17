const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Protected Routes token base
const requireSignIn = async (req, res, next) => {
	try {
		const decode = JWT.verify(
			req.headers.authorization,
			process.env.jwtSecretKey,
		);
		req.user = decode;
		next();
	} catch (error) {
		console.log(error);
	}
};

// admin access
const isAdmin = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.user._id);
		if (user.role !== 1) {
			return res.status(401).send({
				success: false,
				message: 'Unauthorized Access',
			});
		} else {
			next();
		}
	} catch (error) {
		console.log({ error });
		res.status(401).send({
			success: false,
			message: 'Error in Admin Middleware',
			error,
		});
	}
};

module.exports = { requireSignIn, isAdmin };
