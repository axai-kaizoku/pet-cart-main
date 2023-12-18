const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const userModel = require('../models/userModel');

const JWT = require('jsonwebtoken');

const sigupController = async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone, address } = req.body;
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
			expiresIn: '5h',
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

// get test
const testController = (req, res) => {
	try {
		res.send({ message: 'Protected Route' });
	} catch (error) {
		console.log({ error });
		res.send({ error });
	}
};

module.exports = { sigupController, loginController, testController };
