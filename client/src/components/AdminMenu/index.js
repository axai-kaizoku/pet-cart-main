import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
	return (
		<>
			<div className="text-center">
				<div className="list-group">
					<h4>Admin Panel</h4>
					<NavLink
						to="/profile/admin/create-category"
						className="list-group-item list-group-item-action">
						Create Category
					</NavLink>
					<NavLink
						to="/profile/admin/create-product"
						className="list-group-item list-group-item-action">
						Create Product
					</NavLink>
					<NavLink
						to="/profile/admin/products"
						className="list-group-item list-group-item-action">
						Products
					</NavLink>
					<NavLink
						to="/profile/admin/orders"
						className="list-group-item list-group-item-action">
						Orders
					</NavLink>
					<NavLink
						to="/profile/admin/users"
						className="list-group-item list-group-item-action">
						Users
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default AdminMenu;
