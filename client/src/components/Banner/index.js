import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import dogs from '../../assets/homepage/dogs.png';

const Banner = () => {
	return (
		<div className="banner">
			<div className="inner-container">
				<div className="banner-content">
					<h1>PetCart</h1>
					<h2>Your One-Stop Shop for your Pet Needs</h2>
					<p>
						Find everything you need for your furry friend at PetCart - from
						food to toys to grooming supplies.
					</p>
					<NavLink
						id="link"
						to="/store">
						<button
							id="banner-store-btn"
							className="btn btn-primary">
							Shop Now
						</button>
					</NavLink>
				</div>
				<div className="banner-img">
					<img
						src={dogs}
						alt="dogs-main"
						referrerPolicy="no-referrer"
					/>
				</div>
			</div>
		</div>
	);
};

export default Banner;
