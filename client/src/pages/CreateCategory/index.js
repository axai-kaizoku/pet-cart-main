import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form';
import { Modal } from 'antd';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';

const CreateCategory = () => {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState('');
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(null);
	const [updatedName, setUpdatedName] = useState('');
	const [load, setLoad] = useLoad();

	// handle form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const { data } = await axios.post('/api/v1/category/create-category', {
				name,
			});
			setLoad(false);
			if (data?.success) {
				toast.success(`${name} category is created!`);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong in input form');
			setLoad(false);
		}
	};

	//get all categories
	const getAllCategory = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get('/api/v1/category/get-categories');
			setLoad(false);
			if (data?.success) {
				setCategories(data?.category);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong in fetching categories!');
			setLoad(false);
		}
	};

	useEffect(() => {
		getAllCategory();
	}, []);

	// update category
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const { data } = await axios.put(
				`/api/v1/category/update-category/${selected._id}`,
				{ name: updatedName },
			);
			setLoad(false);
			if (data.success) {
				toast.success(`${updatedName} category is updated!`);
				setSelected(null);
				setUpdatedName('');
				setVisible(false);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error('Something went wrong');
			setLoad(false);
		}
	};

	// delete category
	const handleDelete = async (pid) => {
		try {
			setLoad(true);
			const { data } = await axios.delete(
				`/api/v1/category/delete-category/${pid}`,
			);
			setLoad(false);
			if (data.success) {
				toast.success(`Category is deleted!`);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error('Something went wrong');
			setLoad(false);
		}
	};

	return (
		<Layout>
			<Loading isLoading={load} />
			<div className="container-fluid m-1.6 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>Manage Category</h1>
						<div className="p-3 w-50">
							<CategoryForm
								handleSubmit={handleSubmit}
								value={name}
								setValue={setName}
							/>
						</div>
						<div className="w-75">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{categories?.map((c) => (
										<>
											<tr>
												<td key={c._id}>{c.name}</td>
												<td>
													<button
														className="btn btn-primary ms-2"
														onClick={() => {
															setVisible(true);
															setUpdatedName(c.name);
															setSelected(c);
														}}>
														Edit
													</button>
												</td>
												<td>
													<button
														className="btn btn-danger ms-2"
														onClick={() => {
															handleDelete(c._id);
														}}>
														Delete
													</button>
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
						<Modal
							onCancel={() => setVisible(false)}
							footer={null}
							visible={visible}>
							<CategoryForm
								value={updatedName}
								setValue={setUpdatedName}
								handleSubmit={handleUpdate}
							/>
						</Modal>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCategory;
