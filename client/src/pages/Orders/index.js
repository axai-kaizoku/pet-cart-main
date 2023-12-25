import React, { useEffect, useState } from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [auth] = useAuth();
	const [load, setLoad] = useLoad();
	const getOrders = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/auth/orders');
			setOrders(data);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	useEffect(() => {
		if (auth?.token) getOrders();
	}, [auth?.token]);
	return (
		<Layout>
			<Loading isLoading={load} />
			<div className="container-fluid m-1.6 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="order-history-section">
							<h5>Order History</h5>
							<div className="order-history-container">
								{orders?.map((o, i) => {
									return (
										<div className="border">
											<table className="table">
												<thead>
													<tr>
														<th scope="col">
															Purchased Date:{' '}
															{moment(o?.createdAt).format('DD/MM/YYYY')}
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															{o?.products?.map((p, i) => (
																<div
																	className="individual-order"
																	key={p._id}>
																	<div className="ordered-product">
																		<div className="ordered-product-img-name">
																			<img
																				src={`/api/v1/product/product-image/${p._id}`}
																				alt={p.name}
																			/>
																			<Link
																				id="link"
																				state="/profile/user/orders"
																				to={`/product/${p.slug}`}>
																				<h6>{p.name}</h6>
																			</Link>
																		</div>
																		<div className="ordered-product-price">
																			${p.price}
																		</div>
																	</div>
																</div>
															))}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
