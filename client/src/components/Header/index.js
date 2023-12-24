import React from 'react';
import './styles.css';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/logo512.png';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
	const location = useLocation();
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
								id="navLink"
								className={location.pathname === '/' ? 'active' : ''}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/store"
								id="navLink"
								className={location.pathname === '/store' ? 'active' : ''}>
								Store
							</NavLink>
						</li>
						{!auth.user ? (
							<>
								<li>
									<NavLink
										to="/login"
										id="navLink"
										className={location.pathname === '/login' ? 'active' : ''}>
										Login
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink
										to={`/profile/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
										id="navLink"
										className={
											location.pathname === '/profile' ? 'active' : ''
										}>
										Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/"
										onClick={handleLogout}
										id="navLink"
										className="logout">
										Logout
									</NavLink>
								</li>
							</>
						)}

						<li>
							<NavLink
								to="/cart"
								id="navLink-cart">
								<Badge
									badgeContent={cart?.length}
									size="small"
									color="primary">
									<ShoppingCartIcon />
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
