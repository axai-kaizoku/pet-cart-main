import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';
const { Option } = Select;

const AdminOrders = () => {
	const [status, setStatus] = useState([
		'Processing',
		'Confirmed',
		'Shipped',
		'Out for delivery',
		'Cancel',
	]);
	const [orders, setOrders] = useState([]);
	const [auth, setAuth] = useAuth();
	const [load, setLoad] = useLoad();
	const getOrders = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/auth/all-orders');
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

	const handleChange = async (orderId, value) => {
		try {
			setLoad(true);
			const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
				status: value,
			});
			getOrders();
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};
	return (
		<Layout title={'All Orders Data'}>
			<Loading isLoading={load} />
			<div className="container-fluid m-1.6 p-3">
				<div className="row dashboard">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1 className="text-center">All Orders</h1>
						{orders?.map((o, i) => {
							return (
								<div className="border shadow">
									<table className="table">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Status</th>
												<th scope="col">Buyer</th>
												<th scope="col"> date</th>
												<th scope="col">Payment</th>
												<th scope="col">Quantity</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{i + 1}</td>
												<td>
													<Select
														bordered={false}
														onChange={(value) => handleChange(o._id, value)}
														defaultValue={o?.status}>
														{status.map((s, i) => (
															<Option
																key={i}
																value={s}>
																{s}
															</Option>
														))}
													</Select>
												</td>
												<td>{o?.buyer?.firstName}</td>
												<td>{moment(o?.createdAt).format('DD/MM/YYYY')}</td>
												<td>{o?.payment.success ? 'Success' : 'Failed'}</td>
												<td>{o?.products?.length}</td>
											</tr>
										</tbody>
									</table>
									<div className="container">
										{o?.products?.map((p, i) => (
											<div
												className="row mb-2 p-3 card flex-row"
												key={p._id}>
												<div className="col-md-4">
													<img
														id="admin-orders-item-img"
														src={`/api/v1/product/product-image/${p._id}`}
														className="card-img-top"
														alt={p.name}
														width="100px"
														height={'100px'}
													/>
												</div>
												<div className="col-md-8">
													<h6 className="mt-4 mb-4">{p.name}</h6>
													<h6 className="mt-4 mb-4">${p.price}</h6>
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminOrders;
