import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import CartSingleItem from '../../components/CartSingleItem';

const Cart = () => {
	const [auth, setAuth] = useAuth();
	const [cart, setCart] = useCart();

	const totalPrice = () => {
		try {
			let total = 0;
			cart?.map((item) => {
				total = total + item.price;
			});
			return total.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		} catch (error) {
			console.log(error);
		}
	};

	// delete item
	const removeCartItem = (pid) => {
		try {
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item._id === pid);
			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem('cart', JSON.stringify(myCart));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<div className="cart">
				<div className="cart-container">
					<>
						<div className="cart-left">
							<div className="cart-headings-upper">
								<h1>Shopping Cart</h1>
								<h3>{cart?.length} Items</h3>
							</div>
							<hr />
							<div
								style={
									cart?.length > 0 ? { display: '' } : { display: 'none' }
								}>
								<div className="cart-headings-lower">
									<h6>Product Details</h6>
									<h6>Quantity</h6>
									<h6>Total</h6>
								</div>
								<hr />
							</div>
							<div className="cart-items">
								{cart?.length > 0 ? (
									cart.map((i) => (
										<CartSingleItem
											item={i}
											handleRemove={removeCartItem}
										/>
									))
								) : (
									<h6 className="cart-empty-msg">Your cart is empty</h6>
								)}
							</div>

							<Link
								to="/store"
								id="continue-shopping">
								<i>Continue Shopping</i>
							</Link>
						</div>
						<div className="cart-right">
							<h3 className="summary">Order Summary</h3>
							<div className="cart-right-items-price-section">
								<span>{cart?.length} Items</span>
								<span>{totalPrice()}</span>
							</div>
							<div className="cart-right-price-section">
								<span>Total cost</span>
								<span>{totalPrice()}</span>
							</div>
							<div className="cart-btns">
								{auth?.token ? (
									<button className="checkout-btn">Checkout</button>
								) : (
									<Link
										to="/login"
										state="/cart"
										id="login-checkout-btn">
										<button className="login-checkout-btn">
											Login to Checkout
										</button>
									</Link>
								)}
							</div>
						</div>
					</>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;
