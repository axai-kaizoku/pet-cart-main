import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ScrollCart = ({ length = 0 }) => {
	return (
		<div className="scroll-cart">
			<NavLink
				to="/cart"
				id="link">
				<Fab>
					<Badge
						badgeContent={length}
						color="primary">
						<ShoppingCartIcon color="action" />
					</Badge>
				</Fab>
			</NavLink>
		</div>
	);
};

export default ScrollCart;
