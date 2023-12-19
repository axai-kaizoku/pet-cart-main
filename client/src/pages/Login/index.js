import React, { useState } from 'react';
import Layout from '../../components/Layout';
import './styles.css';
import toast from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [auth, setAuth] = useAuth();

	const navigate = useNavigate();
	const location = useLocation();

	//form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/auth/login', { email, password });
			console.log('Problem is here on line 25 login page');

			if (res && res.data.success) {
				toast.success(res.data && res.data.message);
				console.log('Problem is here on line 29 login page');

				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				console.log('Problem is here on line 36 login page');

				localStorage.setItem('auth', JSON.stringify(res.data));
				navigate(location.state || '/');
				console.log('Problem is here on line 40 login page');
			} else {
				console.log('Problem is here on line 43 login page');

				toast.error(res.data.message);
			}
		} catch (error) {
			console.log('Problem is here on line 38 login page');
			console.log(error);
			toast.error('Something went wrong!');
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
					<div className="mb-3">
						<p>
							Don't have an account?
							<Link
								id="link"
								to="/signup">
								Signup
							</Link>
						</p>
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
