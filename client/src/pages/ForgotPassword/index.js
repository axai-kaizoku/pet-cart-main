import React, { useState } from 'react';
import Layout from '../../components/Layout';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [answer, setAnswer] = useState('');

	const navigate = useNavigate();

	//form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/auth/forgot-password', {
				email,
				newPassword,
				answer,
			});

			if (res && res.data.success) {
				toast.success(res.data && res.data.message);

				navigate('/login');
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		}
	};

	return (
		<Layout>
			<div className="login-container">
				<h1>Reset Password</h1>
				<form onClick={handleSubmit}>
					<div className="mb-3">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Email Address"
							required
						/>
					</div>

					<div className="mb-3">
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Enter Your Password"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							className="form-control"
							id="exampleInputPassword1"
							placeholder="What is your Favorite Dish?"
							required
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary">
						Reset
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
