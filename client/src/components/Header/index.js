import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo512.png';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';
import { Badge } from '@mui/material';

const Header = () => {
	const [auth, setAuth] = useAuth();
	const [cart] = useCart();
	const handleLogout = () => {
		setAuth({
			...auth,
			user: null,
			token: '',
		});
		localStorage.removeItem('auth');
		toast.success('Logout Success!');
	};
	const currentPath = window.location.pathname;
	const currentPathName = currentPath.split('/')[1];
	console.log(currentPath);
	console.log(currentPathName);

	return (
		<>
			<nav>
				<div className="navbar">
					<div className="navbar-logo">
						<NavLink
							to="/"
							id="logo-section">
							<div className="logo">
								<img
									src={logo}
									alt="logo"
								/>
							</div>
						</NavLink>
					</div>
					<ul>
						<li>
							<NavLink
								to="/"
								id="navLink">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/store"
								id="navLink">
								Store
							</NavLink>
						</li>
						{!auth.user ? (
							<>
								<li>
									<NavLink
										to="/login"
										id="navLink">
										Login
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink
										to={`/profile/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
										id="navLink">
										Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/"
										onClick={handleLogout}
										id="navLink">
										Logout
									</NavLink>
								</li>
							</>
						)}

						<li>
							<NavLink
								to="/cart"
								id="navLink">
								<Badge
									badgeContent={cart?.length}
									size="small"
									color="primary">
									Cart
								</Badge>
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Header;
