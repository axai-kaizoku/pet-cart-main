const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

const JWT = require('jsonwebtoken');

const sigupController = async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone, address, answer } =
			req.body;
		// validate
		if (!firstName) {
			return res.send({ message: 'First Name is required' });
		}
		if (!lastName) {
			return res.send({ message: 'Last Name is required' });
		}
		if (!email) {
			return res.send({ message: 'Email is required' });
		}
		if (!password) {
			return res.send({ message: 'Password is required' });
		}
		if (!phone) {
			return res.send({ message: 'Phone no. is required' });
		}
		if (!address) {
			return res.send({ message: 'Address is required' });
		}
		if (!answer) {
			return res.send({ message: 'Answer is required' });
		}

		// check user
		const existingUser = await userModel.findOne({ email });

		// user exists
		if (existingUser) {
			return res.status(200).send({
				success: false,
				message: 'Account Exists! Please login',
			});
		}

		// signing up User
		const hashedPassword = await hashPassword(password);

		// save
		const user = new userModel({
			firstName,
			lastName,
			email,
			phone,
			address,
			password: hashedPassword,
			answer,
		}).save();

		res.status(201).send({
			success: true,
			message: 'User signedup successfully!',
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Signing Up',
			error,
		});
	}
};

// post login

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		// validate
		if (!email || !password) {
			return res.status(404).send({
				success: false,
				message: 'Invalid email or password',
			});
		}

		// check user
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).send({
				success: false,
				message: 'Email not registered',
			});
		}

		//check password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(200).send({
				success: false,
				message: 'Invalid Password',
			});
		}

		//token
		const token = await JWT.sign({ _id: user._id }, process.env.jwtSecretKey, {
			expiresIn: '7d',
		});
		res.status(200).send({
			success: true,
			message: 'Login Successful !',
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				address: user.address,
				role: user.role,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error Logging in',
			error,
		});
	}
};

// forgotPasswordController

const forgotPasswordController = async (req, res) => {
	try {
		const { email, answer, newPassword } = req.body;
		if (!email) return res.status(400).send({ message: 'Email is required!' });
		if (!answer)
			return res.status(400).send({ message: 'Answer is required!' });
		if (!newPassword)
			return res.status(400).send({ message: 'New Password is required!' });
		// check
		const user = await userModel.findOne({ email, answer });
		// validation
		if (!user)
			return res
				.status(404)
				.send({ success: false, message: 'Wrong Email or Answer' });
		const hashed = await hashPassword(newPassword);
		await userModel.findByIdAndUpdate(user._id, { password: hashed });
		res.status(200).send({ success: true, message: 'Password Reset Success!' });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Something went wrong!',
			error,
		});
	}
};

// update profile controller
const updateProfileController = async (req, res) => {
	try {
		const { firstName, lastName, email, phone, password, address } = req.body;
		const user = await userModel.findById(req.user._id);
		// password
		if (password && password.length < 6) {
			return res.json({
				error: 'Password is required and should be 6 characters!',
			});
		}
		const hashedPassword = password ? await hashPassword(password) : undefined;

		const updatedUser = await userModel.findByIdAndUpdate(
			req.user._id,
			{
				firstName: firstName || user.firstName,
				lastName: lastName || user.firstName,
				password: hashedPassword || user.password,
				address: address || user.address,
				phone: phone || user.phone,
			},
			{ new: true },
		);
		res.status(200).send({
			success: true,
			message: 'Profile updated successfully!',
			updatedUser,
		});
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ success: false, error, message: 'Error in updating profile!' });
	}
};

const getOrdersController = async (req, res) => {
	try {
		const orders = await orderModel
			.find({ buyer: req.user._id })
			.populate('products')
			.sort({ createdAt: '-1' });
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error while fetching orders',
			error,
		});
	}
};

const getAllOrdersController = async (req, res) => {
	try {
		const orders = await orderModel
			.find({})
			.populate('products')
			.populate('buyer', 'firstName')
			.sort({ createdAt: '-1' });
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error while fetching all orders',
			error,
		});
	}
};

const orderStatusController = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const order = await orderModel.findByIdAndUpdate(
			id,
			{ status },
			{ new: true },
		);
		res.json(order);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error while changing order status',
			error,
		});
	}
};

const getAllUsersController = async (req, res) => {
	try {
		const users = await userModel.find({});
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error while fetching all users',
			error,
		});
	}
};

module.exports = {
	sigupController,
	loginController,
	forgotPasswordController,
	updateProfileController,
	getOrdersController,
	getAllOrdersController,
	orderStatusController,
	getAllUsersController,
};
