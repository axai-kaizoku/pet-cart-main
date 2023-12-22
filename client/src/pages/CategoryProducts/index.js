import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useParams } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import axios from 'axios';
import SearchInput from '../../components/SearchInput';

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	// const category = useCategory();
	const params = useParams();
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (params?.slug) getProductsByCategory();
	}, [params?.slug]);

	const getProductsByCategory = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/product-category/${params.slug}`,
			);
			setProducts(data?.products);
		} catch (error) {
			console.log(error);
		}
	};

	// to convert slug to title case
	function convertToTitleCase(str) {
		if (!str) {
			return '';
		}
		return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
	}

	// load more btn

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
		getTotal();
	}, []);

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
								<li>{convertToTitleCase(params?.slug)}</li>
							</ul>
							<Link
								id="back-btn"
								to="/store">
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
						{/* <div className="m-2 p-3">
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
						</div> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CategoryProducts;
