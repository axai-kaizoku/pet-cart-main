import React, { useState, useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

import ScrollCart from '../../components/ScrollCart';

const ProductDetails = () => {
	const [load, setLoad] = useLoad();
	const params = useParams();
	const [cart, setCart] = useCart();
	const location = useLocation();
	const [product, setProduct] = useState({});

	// initial product
	useEffect(() => {
		if (params?.slug) getProduct();
	}, [params?.slug]);

	// get product func
	const getProduct = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get(
				`/api/v1/product/get-product/${params.slug}`,
			);
			setProduct(data?.product);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};
	return (
		<Layout>
			<Loading isLoading={load} />
			<ScrollCart length={cart?.length} />
			<div className="product-details">
				<div className="inner-container">
					<section>
						<div className="left-container">
							<Link
								id="back-to-cart-btn"
								to={location.state || `/store`}>
								Back
							</Link>
							<div className="product-detail-img-div">
								<img
									className="product-img"
									src={`/api/v1/product/product-image/${product._id}`}
									alt={product.name}
								/>
							</div>
						</div>
						<div className="right-container">
							<h3 className="product-name">{product.name}</h3>

							<p className="product-description">{product.description}</p>
							<div className="right-lower-container">
								<div className="right-lower-container-price">
									<span className="product-price">${product.price}</span>
									<div className="buy-wishlist-btns">
										<button
											className="add-to-cart-btn btn btn-primary"
											onClick={() => {
												setCart([...cart, product]);
												localStorage.setItem(
													'cart',
													JSON.stringify([...cart, product]),
												);
												toast.success('Item added to cart');
											}}>
											Add To Cart
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default ProductDetails;
