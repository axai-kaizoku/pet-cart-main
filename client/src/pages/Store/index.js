import React, { useState, useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { useSearch } from '../../context/search';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';
import ScrollCart from '../../components/ScrollCart';

const Store = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useCart();
	const [load, setLoad] = useLoad();
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [values] = useSearch();
	const categories = useCategory();

	// get products
	const getAllProducts = async () => {
		try {
			setLoading(true);
			setLoad(true);
			const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
			setLoading(false);

			setProducts(data?.products);
			setLoad(false);
		} catch (error) {
			setLoading(false);
			setLoad(false);

			console.log(error);
		}
	};

	// get total count
	const getTotal = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/product/product-count');
			setLoad(false);

			setTotal(data?.total);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	useEffect(() => {
		if (page === 1) return;
		loadMore();
	}, [page]);

	// load more
	const loadMore = async () => {
		try {
			setLoading(true);
			setLoad(true);
			const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
			setProducts([...products, ...data?.products]);
			setLoading(false);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setLoad(false);
		}
	};

	useEffect(() => {
		getAllProducts();
		getTotal();
	}, []);

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
							<h2>Categories</h2>
							<div style={{ height: 'fit-content' }}>
								<ul>
									{categories?.map((c) => (
										<li key={c._id}>
											<Link
												id="link"
												to={`/store/category/${c.slug}`}>
												{c.name}
											</Link>
										</li>
									))}
								</ul>
								<Link
									id="link-back-btn"
									to="/"
									style={{ marginBottom: '5px' }}>
									Back
								</Link>
							</div>
						</div>
					</div>
					<div className="product-list">
						<div className="product-list-inner">
							{products?.map((item) => (
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
											<div className="product-name">
												<Link
													id="product-name"
													to={`/product/${item.slug}`}>
													{item.name}
												</Link>
											</div>
										</div>
									</div>
									<div className="product-lower text-center">
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
							))}
						</div>
						<div className="m-2 p-3">
							{products && products.length < total && (
								<button
									className="btn btn-outline-primary"
									onClick={(e) => {
										e.preventDefault();
										setPage(page + 1);
									}}>
									{loading ? 'Loading...' : 'Load More'}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Store;
