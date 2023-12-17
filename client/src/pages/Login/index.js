import React, { useState } from 'react';
import Layout from '../../components/Layout';
import './styles.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/auth/login`,
				{ email, password },
			);
			if (res && res.data.success) {
				toast.success(res.data.message);
				navigate('/');
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	return (
		<Layout title="Login">
			<div className="login-container">
				<h1>Login</h1>
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Enter Your Password"
							required
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
