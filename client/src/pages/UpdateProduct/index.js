import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Image, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useLoad } from '../../context/load';
const { Option } = Select;

const UpdateProduct = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [shipping, setShipping] = useState('');
	const [image, setImage] = useState('');
	const [id, setId] = useState('');
	const [load, setLoad] = useLoad();

	//get single product
	const getSingleProduct = async () => {
		try {
			setLoad(true);
			const { data } = await axios.get(
				`/api/v1/product/get-product/${params.slug}`,
			);

			setName(data.product.name);
			setId(data.product._id);
			setDescription(data.product.description);
			setPrice(data.product.price);
			// setPrice(data.product.price);
			setQuantity(data.product.quantity);
			setShipping(data.product.shipping);
			setCategory(data.product.category._id);
			setLoad(false);
		} catch (error) {
			console.log(error);
			setLoad(false);
		}
	};
	useEffect(() => {
		getSingleProduct();
		//eslint-disable-next-line
	}, []);

	//get all category
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
			toast.error('Something went wrong in fetching catgeory');
			setLoad(false);
		}
	};

	useEffect(() => {
		getAllCategory();
	}, []);

	//update product function
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			setLoad(true);
			const productData = new FormData();
			productData.append('name', name);
			productData.append('description', description);
			productData.append('price', price);
			productData.append('quantity', quantity);
			image && productData.append('image', image);
			productData.append('category', category);
			const { data } = await axios.put(
				`/api/v1/product/update-product/${id}`,
				productData,
			);
			setLoad(false);
			if (data?.success) {
				toast.success('Product Updated Successfully');
				navigate('/profile/admin/products');
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('something went wrong');
			setLoad(false);
		}
	};

	//delete a product
	const handleDelete = async () => {
		try {
			setLoad(true);
			let answer = window.prompt('Are You Sure want to delete this product ? ');
			if (!answer) return;
			const { data } = await axios.delete(
				`/api/v1/product/delete-product/${id}`,
			);
			setLoad(false);
			toast.success('Product Deleted Successfully!');
			navigate('/profile/admin/products');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
			setLoad(false);
		}
	};
	return (
		<Layout title={'Profile - Update Product'}>
			<Loading isLoading={load} />
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>Update Product</h1>
						<div className="m-1 w-75">
							<Select
								bordered={false}
								placeholder="Select a category"
								size="large"
								showSearch
								className="form-select mb-3"
								onChange={(value) => {
									setCategory(value);
								}}
								value={category}>
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
									{image ? image.name : 'Upload Photo'}
									<input
										type="file"
										name="photo"
										accept="image/*"
										onChange={(e) => setImage(e.target.files[0])}
										hidden
									/>
								</label>
							</div>
							<div className="mb-3">
								{!Image ? (
									<div className="text-center">
										<img
											src={URL.createObjectURL(image)}
											alt="product_image"
											height={'200px'}
											className="img img-responsive"
										/>
									</div>
								) : (
									<div className="text-center">
										<img
											src={`/api/v1/product/product-image/${id}`}
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
									onChange={(e) => setName(e.target.value)}
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
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="number"
									value={quantity}
									placeholder="Product Quantity"
									className="form-control"
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<Select
									bordered={false}
									placeholder="Select Shipping "
									size="large"
									showSearch
									className="form-select mb-3"
									onChange={(value) => {
										setShipping(value);
									}}
									value={shipping ? 'yes' : 'No'}>
									<Option value="0">No</Option>
									<Option value="1">Yes</Option>
								</Select>
							</div>
							<div className="mb-3">
								<button
									className="btn btn-primary"
									onClick={handleUpdate}>
									UPDATE PRODUCT
								</button>
							</div>
							<div className="mb-3">
								<button
									className="btn btn-danger"
									onClick={handleDelete}>
									DELETE PRODUCT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UpdateProduct;
