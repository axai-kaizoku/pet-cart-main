import React from 'react';
import Layout from '../../components/Layout';
import './styles.css';

const Signup = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Layout title="Signup">
			<div className="signup-container">
				<h1>Signup</h1>
				<form onClick={handleSubmit}>
					<div class="mb-3">
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your First Name"
						/>
					</div>
					<div class="mb-3">
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Last Name"
						/>
					</div>
					<div class="mb-3">
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Phone Number"
						/>
					</div>
					<div class="mb-3">
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Address"
						/>
					</div>
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
						Signup
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Signup;
