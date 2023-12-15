const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const userModel = require('../models/userModel');

const JWT = require('jsonwebtoken');

const sigupController = async (req, res) => {
	try {
		const { name, email, password, phone, address } = req.body;
		// validate
		if (!name) {
			return res.send({ error: 'Name is required' });
		}
		if (!email) {
			return res.send({ error: 'Email is required' });
		}
		if (!password) {
			return res.send({ error: 'Password is required' });
		}
		if (!phone) {
			return res.send({ error: 'Phone no. is required' });
		}
		if (!address) {
			return res.send({ error: 'Address is required' });
		}

		// check user
		const existingUser = await userModel.findOne({ email });

		// user exists
		if (existingUser) {
			return res.status(200).send({
				success: true,
				message: 'Account Exists! Please login',
			});
		}

		// signing up User
		const hashedPassword = await hashPassword(password);

		// save
		const user = new userModel({
			name,
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
				name: user.name,
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

module.exports = { sigupController, loginController };
