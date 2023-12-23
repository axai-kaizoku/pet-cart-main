import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';
const { Option } = Select;

const CreateProduct = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [shipping, setShipping] = useState('');
	const [load, setLoad] = useLoad();

	//get all products
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

	// create product function
	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const productData = new FormData();
			productData.append('name', name);
			productData.append('description', description);
			productData.append('price', price);
			productData.append('quantity', quantity);
			productData.append('image', image);
			productData.append('category', category);
			const { data } = axios.post(
				'/api/v1/product/create-product',
				productData,
			);
			setLoad(false);
			if (data?.success) {
				toast.error(data?.message);
			} else {
				toast.success('Product Created Successfully!');
				navigate('/profile/admin/products');
			}
		} catch (error) {
			console.log(error);
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
						<h1>Create Product</h1>
						<div className="m-1 w-75">
							<Select
								bordered={false}
								placeholder="Select a category"
								size="large"
								showSearch
								className="form-select mb-3"
								onChange={(value) => {
									setCategory(value);
								}}>
								{categories?.map((c) => (
									<Option
										key={c._id}
										value={c._id}>
										{c.name}
									</Option>
								))}
							</Select>
							<div className="mb-3">
								<label className="btn btn-outline-secondary col-md-12">
									{image ? image.name : 'Upload Image'}
									<input
										type="file"
										name="image"
										accept="image/*"
										onChange={(e) => {
											setImage(e.target.files[0]);
										}}
										hidden
									/>
								</label>
							</div>
							<div className="mb-3">
								{image && (
									<div className="text-center">
										<img
											src={URL.createObjectURL(image)}
											alt="product-img"
											height={'200px'}
											className="img img-responsive"
										/>
									</div>
								)}
							</div>
							<div className="mb-3">
								<input
									type="text"
									value={name}
									placeholder="Product Name"
									className="form-control"
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>

							<div className="mb-3">
								<textarea
									type="text"
									value={description}
									placeholder="Product Description"
									className="form-control"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<div className="mb-3">
								<input
									type="number"
									value={price}
									placeholder="Product Price"
									className="form-control"
									step="0.01"
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>

							<div className="mb-3">
								<input
									type="number"
									value={quantity}
									placeholder="Product Quantity"
									className="form-control"
									onChange={(e) => {
										setQuantity(e.target.value);
									}}
								/>
							</div>

							<div className="mb-3">
								<Select
									bordered={false}
									placeholder="Select Shipping"
									size="large"
									showSearch
									className="form-select mb-3"
									onChange={(value) => {
										setShipping(value);
									}}>
									<Option value="0">No</Option>
									<Option value="1">Yes</Option>
								</Select>
							</div>
							<div className="mb-3">
								<button
									className="btn btn-primary"
									onClick={handleCreate}>
									CREATE PRODUCT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreateProduct;
