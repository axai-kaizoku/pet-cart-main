import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';

const User = () => {
	const [auth] = useAuth();
	return (
		<Layout>
			<div className="container-fluid m-1.5 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="card w-75 p-3">
							<h3>
								User Name: {`${auth?.user?.firstName} ${auth?.user?.lastName}`}
							</h3>

							<h3>User Email: {auth?.user?.email}</h3>
							<h3>User Contact: {auth?.user?.phone}</h3>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default User;
