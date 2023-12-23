import React from 'react';
import Layout from '../../components/Layout';
import { useSearch } from '../../context/search';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

const Search = () => {
	const [values, setValues] = useSearch();
	const [cart, setCart] = useCart();

	return (
		<Layout title={'Search results'}>
			<div className="container">
				<div className="text-center">
					<h1>Search Resuts</h1>
					<h6>
						{values?.results.length < 1
							? 'No Products Found'
							: `Found ${values?.results.length}`}
					</h6>
					<div className="d-flex flex-wrap mt-4">
						{values?.results.map((item) => (
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
												state="/search"
												to={`/product/${item.slug}`}>
												{item.name}
											</Link>
										</div>
									</div>
									<div className="product-lower">
										<button
											className="btn btn-secondary"
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
		</Layout>
	);
};

export default Search;
