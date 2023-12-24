import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-below">
				<div className="footer-copyright">
					<p>
						&copy; {new Date().getFullYear()} PetCart™. All Rights Reserved.
					</p>
				</div>
				<div className="footer-below-links">
					<Link to="/about">
						<p>About</p>
					</Link>
					<Link to="/contact">
						<p>Contact</p>
					</Link>
					<a href="##">
						<p>Security</p>
					</a>
					<a href="##">
						<p>Terms and Conditions</p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
