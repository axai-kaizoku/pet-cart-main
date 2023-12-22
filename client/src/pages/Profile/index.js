import React, { useState, useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
	const [firstName, setFname] = useState('');
	const [lastName, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [auth, setAuth] = useAuth();

	// get user data
	useEffect(() => {
		const { email, phone, firstName, lastName, address, password } = auth?.user;
		setFname(firstName);
		setLname(lastName);
		setEmail(email);
		setPhone(phone);
		setAddress(address);
	}, [auth?.user]);

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put('/api/v1/auth/update-profile', {
				firstName,
				lastName,
				email,
				phone,
				address,
				password,
			});
			if (data?.error) {
				toast.error(data?.error);
			} else {
				setAuth({ ...auth, user: data?.updatedUser });
				let ls = localStorage.getItem('auth');
				ls = JSON.parse(ls);
				ls.user = data.updatedUser;
				localStorage.setItem('auth', JSON.stringify(ls));
				toast.success('Profile updated Successfully!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	return (
		<Layout>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="update-container">
							<h1>Update Profile</h1>
							<form onClick={handleSubmit}>
								<>
									<div className="mb-3">
										<input
											type="text"
											value={firstName}
											onChange={(e) => setFname(e.target.value)}
											className="form-control"
											id="exampleInputEmail1"
											placeholder="Enter Your First Name"
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
											disabled
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
										/>
									</div>
									<button
										type="submit"
										className="btn btn-primary">
										Update
									</button>
								</>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
