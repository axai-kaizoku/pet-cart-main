import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import SearchInput from '../../components/SearchInput';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';
import { useCart } from '../../context/cart';
import ScrollCart from '../../components/ScrollCart';
import toast from 'react-hot-toast';

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useCart();
	const params = useParams();
	const [load, setLoad] = useLoad();

	useEffect(() => {
		if (params?.slug) getProductsByCategory();
	}, [params?.slug]);

	const getProductsByCategory = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get(
				`/api/v1/product/product-category/${params.slug}`,
			);
			setProducts(data?.products);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	// to convert slug to title case
	function convertToTitleCase(str) {
		if (!str) {
			return '';
		}
		return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
	}

	return (
		<Layout>
			<Loading isLoading={load} />
			<div className="store">
				<div className="store-container">
					<div className="store-search">
						<ScrollCart length={cart?.length} />
						<SearchInput />
					</div>
				</div>
				<div className="store-area">
					<div className="categories-card">
						<div className="categories-card-inner">
							<h2>Category</h2>

							<ul>
								<li>{convertToTitleCase(params?.slug)}</li>
							</ul>
							<Link
								id="link-back-btn"
								to="/store">
								<p>Back</p>
							</Link>
						</div>
					</div>
					<div className="product-list">
						<div className="product-list-inner">
							{products?.map((item) => (
								<>
									<div
										className="product-list-inner-product"
										key={item._id}>
										<div className="product-upper">
											<div className="product-upper-img">
												<img
													src={`/api/v1/product/product-image/${item._id}`}
													alt="product"
												/>
											</div>
											<div className="product-upper-inner">
												<div className="product-price">
													<span>Price:</span>
													<p>${item.price}</p>
												</div>
												<Link
													id="product-name"
													to={`/product/${item.slug}`}>
													{item.name}
												</Link>
											</div>
										</div>
										<div className="product-lower">
											<button
												className="btn btn-primary"
												onClick={() => {
													setCart([...cart, item]);
													localStorage.setItem(
														'cart',
														JSON.stringify([...cart, item]),
													);
													toast.success('Item added to cart');
												}}>
												Add To Cart
											</button>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CategoryProducts;
