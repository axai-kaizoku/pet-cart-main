import React, { useState } from 'react';
import Layout from '../../components/Layout';
import './styles.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const Signup = () => {
	const [firstName, setFname] = useState('');
	const [lastName, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [answer, setAnswer] = useState('');
	const [load, setLoad] = useLoad();

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const res = await axios.post('/api/v1/auth/signup', {
				firstName,
				lastName,
				email,
				phone,
				address,
				password,
				answer,
			});
			setLoad(false);
			if (res && res.data.success) {
				toast.success(res.data.message);
				navigate('/login');
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
			setLoad(false);
		}
	};

	return (
		<Layout title="Signup">
			<Loading isLoading={load} />
			<div className="signup-container">
				<h1>Signup</h1>
				<form onClick={handleSubmit}>
					<div className="mb-3">
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFname(e.target.value)}
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your First Name"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLname(e.target.value)}
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Last Name"
							required
						/>
					</div>
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
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Phone Number"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Enter Your Address"
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
						Signup
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Signup;
