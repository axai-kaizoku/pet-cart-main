import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [auth] = useAuth();
	const [load, setLoad] = useLoad();
	const getUsers = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/auth/users');
			setUsers(data);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};

	useEffect(() => {
		if (auth?.token) getUsers();
	}, [auth?.token]);

	return (
		<Layout>
			<Loading isLoading={load} />
			<div className="container-fluid m-1.6 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>All Users</h1>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">First Name</th>
									<th scope="col">Last Name</th>
									<th scope="col">Email</th>
									<th scope="col">Role</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, i) => (
									<tr>
										<td>{i + 1}</td>
										<td>{user.firstName}</td>
										<td>{user.lastName}</td>
										<td>{user.email}</td>
										<td>{user?.role === 1 ? 'Admin' : 'User'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Users;
