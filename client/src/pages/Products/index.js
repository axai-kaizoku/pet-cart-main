import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Products = () => {
	const [products, setProducts] = useState([]);

	//get all products
	const getAllProducts = async () => {
		try {
			const { data } = await axios.get('/api/v1/product/get-products');
			setProducts(data.products);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		getAllProducts();
	}, [products]);

	return (
		<Layout>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9 ">
						<h1 className="text-center">All Products List</h1>
						<div
							className="d-flex"
							style={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
							}}>
							{products?.map((p) => (
								<Link
									key={p._id}
									to={`/profile/admin/update-product/${p.slug}`}
									className="product-link">
									<div
										className="card m-2"
										style={{ width: '18rem' }}>
										<img
											src={`/api/v1/product/product-image/${p._id}`}
											className="card-img-top"
											alt={p.name}
										/>
										<div className="card-body">
											<h5 className="card-title">{p.name}</h5>
											<p className="card-text">{p.description}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Products;
