import React, { useState } from 'react';
import Layout from '../../components/Layout';
import './styles.css';
import toast from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [auth, setAuth] = useAuth();
	const [load, setLoad] = useLoad();
	const navigate = useNavigate();
	const location = useLocation();

	//form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const res = await axios.post('/api/v1/auth/login', { email, password });
			setLoad(false);
			if (res && res.data.success) {
				toast.success(res.data && res.data.message);

				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});

				localStorage.setItem('auth', JSON.stringify(res.data));
				navigate(location.state || '/');
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
			setLoad(false);
		}
	};

	return (
		<Layout title="Login">
			<Loading isLoading={load} />
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
						<p
							onClick={() => {
								navigate('/forgot-password');
							}}
							style={{ cursor: 'pointer' }}>
							Forgot Password
						</p>
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
