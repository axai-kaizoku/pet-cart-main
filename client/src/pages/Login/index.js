import React from 'react';
import Layout from '../../components/Layout';
import './styles.css';

const Login = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Layout title="Login">
			<div className="login-container">
				<h2>Login</h2>
				<form onClick={handleSubmit}>
					<div class="mb-3">
						<input
							type="email"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Email Address"
						/>
					</div>
					<div class="mb-3">
						<input
							type="password"
							class="form-control"
							id="exampleInputPassword1"
							placeholder="Enter Your Password"
						/>
					</div>
					<button
						type="submit"
						class="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
