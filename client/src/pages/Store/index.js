import React, { useState, useEffect } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
// import { Radio } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { useSearch } from '../../context/search';
import useCategory from '../../hooks/useCategory';

const Store = () => {
	const [products, setProducts] = useState([]);
	// const [categories, setCategories] = useState([]);
	// const [checked, setChecked] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useSearch();
	const categories = useCategory();
	const searchedProducts = values?.results;
	console.log(searchedProducts);

	// get products
	const getAllProducts = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
			setLoading(false);
			setProducts(data?.products);
		} catch (error) {
			setLoading(false);

			console.log(error);
		}
	};

	// get total count
	const getTotal = async () => {
		try {
			const { data } = await axios.get('/api/v1/product/product-count');
			setTotal(data?.total);
		} catch (error) {
			console.log(error);
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
			const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
			setLoading(false);
			setProducts([...products, ...data?.products]);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllProducts();
		getTotal();
	}, []);

	// //get all categories
	// const getAllCategory = async () => {
	// 	try {
	// 		const { data } = await axios.get('/api/v1/category/get-categories');
	// 		if (data?.success) {
	// 			setCategories(data?.category);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	getAllCategory();
	// 	getTotal();
	// }, []);

	// filtering by category
	// const handleFilter = (value, id) => {
	// 	let all = [];
	// 	if (value) {
	// 		all.push(id);
	// 	}
	// 	setChecked(all);
	// };

	// useEffect(() => {
	// 	if (!checked.length) getAllProducts();
	// }, [checked.length]);

	// useEffect(() => {
	// 	if (checked.length) filterProducts();
	// }, [checked]);

	// // get filtered products
	// const filterProducts = async () => {
	// 	try {
	// 		const { data } = await axios.post('/api/v1/product/filter-product', {
	// 			checked,
	// 		});
	// 		setProducts(data?.products);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<Layout>
			<div className="store">
				<div className="store-container">
					<div className="store-search">
						<SearchInput />
					</div>
				</div>
				<div className="store-area">
					<div className="categories-card">
						<div className="categories-card-inner">
							<h2>Categories</h2>
							{/* {JSON.stringify(checked, null, 4)} */}
							{/* <ul>
								<Radio.Group
									style={{
										textDecoration: 'none',
										border: 'none',
										appearance: 'none',
									}}>
									{categories?.map((c) => (
										<li
											key={c._id}
											onClick={(e) => handleFilter(e.target.checked, c._id)}>
											<Radio.Button
												id="radio-btns"
												value={c._id}>
												{c.name}
											</Radio.Button>
										</li>
									))}
								</Radio.Group>
							</ul> */}
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
								id="back-btn"
								to="/">
								Back
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
											<button>Add To Cart</button>
										</div>
									</div>
								</>
							))}
						</div>
						<div className="m-2 p-3">
							{products && products.length < total && (
								<button
									className="btn btn-warning"
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
