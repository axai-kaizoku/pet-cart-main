import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/logo512.png';

const Header = () => {
	// const currentPath = window.location.pathname;
	// const currentPathName = currentPath.split('/')[1];

	// useEffect(() => {
	//   if (currentPathName === '') {
	//     dispatch(updateCurrentPage('Home'));
	//     document.title = 'ProPet | Home';
	//     return;
	//   }
	//   const currentPage =
	//     currentPathName.charAt(0).toUpperCase() + currentPathName.slice(1);
	//   dispatch(updateCurrentPage(currentPage));

	//   document.title = `ProPet | ${currentPage}`;
	// }, [currentPathName, dispatch]);

	// const cart = [1, 2, 3, 4];
	const login = false;
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
								<p>PetCart</p>
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
						{login ? (
							<li>
								<NavLink
									to="/profile"
									id="navLink">
									Profile
								</NavLink>
							</li>
						) : (
							''
						)}
						<li>
							{login ? (
								<NavLink
									to="/"
									id="navLink">
									Logout
								</NavLink>
							) : (
								<NavLink
									to="/login"
									id="navLink">
									Login
								</NavLink>
							)}
						</li>
						<li>
							<NavLink
								to="/cart"
								id="navLink">
								Cart
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Header;
