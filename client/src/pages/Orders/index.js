import React from 'react';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';

const Orders = () => {
	return (
		<Layout>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-3">
						<h1>Your Orders</h1>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
