import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const CartSingleItem = ({ item, handleRemove }) => {
	const [num, setNum] = useState(1);
	return (
		<div className="cart-single-item">
			<div className="product-details">
				<div className="product-details-img">
					<img
						src={`/api/v1/product/product-image/${item._id}`}
						alt={item.name}
					/>
				</div>
				<div className="product-details-name">
					<span>
						<Link
							id="link"
							state="/cart"
							to={`/product/${item.slug}`}>
							{item.name}
						</Link>
					</span>
					<button onClick={() => handleRemove(item._id)}>Remove</button>
				</div>
			</div>
			{/* <div className="quantity">
				<div
					onClick={(e) => {
						e.preventDefault();
						setNum(num - 1);
					}}>
					-
				</div>
				<input
					type="text"
					value={num}
				/>
				<div
					onClick={(e) => {
						e.preventDefault();
						setNum(num + 1);
					}}>
					+
				</div>
			</div> */}
			<span className="price">${item.price}</span>
		</div>
	);
};

export default CartSingleItem;
