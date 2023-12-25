import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import CartSingleItem from '../../components/CartSingleItem';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const Cart = () => {
	const [auth, setAuth] = useAuth();
	const [cart, setCart] = useCart();
	const [clientToken, setClientToken] = useState('');
	const [instance, setInstance] = useState('');
	const [loading, setLoading] = useState(false);

	const [load, setLoad] = useLoad();
	const navigate = useNavigate();

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
			setLoad(false);
		}
	};

	// delete item
	const removeCartItem = (pid) => {
		try {
			setLoad(true);
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item._id === pid);
			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem('cart', JSON.stringify(myCart));
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	// get payment gateway token
	const getToken = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/product/braintree/token');
			setClientToken(data?.clientToken);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	useEffect(() => {
		getToken();
	}, [auth?.token]);

	// handle payment
	const handlePayment = async () => {
		try {
			setLoad(true);
			setLoading(true);
			const { nonce } = await instance.requestPaymentMethod();
			const { data } = await axios.post('/api/v1/product/braintree/payment', {
				nonce,
				cart,
			});
			setLoading(false);
			localStorage.removeItem('cart');
			setCart([]);
			setLoad(false);
			navigate('/profile/user/orders');
			toast.success('Payment completed successfully!');
		} catch (error) {
			console.log(error);
			setLoading(false);
			setLoad(false);
		}
	};

	return (
		<Layout>
			<Loading isLoading={load} />
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
								id="continue-shopping link">
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
								{clientToken && auth?.token ? (
									<div className="mt-2">
										<div
											style={
												cart?.length > 0 ? { display: '' } : { display: 'none' }
											}>
											<DropIn
												options={{
													authorization: clientToken,
													paypal: {
														flow: 'vault',
													},
													googlePay: {},
												}}
												onInstance={(instance) => setInstance(instance)}
												id="dropin-payment"
											/>
										</div>
										<div className="mb-1 text-center">
											<button
												className="btn btn-primary"
												onClick={handlePayment}
												disabled={cart?.length > 0 ? '' : 'true'}>
												Make Payment
											</button>
										</div>
									</div>
								) : (
									<Link
										to="/login"
										state="/cart"
										id="login-checkout-btn">
										<button className="login-checkout-btn btn btn-primary">
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
