import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	const params = useParams();

	useEffect(() => {
		if (params?.slug) getProductsByCategory();
	}, [params?.slug]);

	const getProductsByCategory = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/product-category/${params.slug}`,
			);
			setProducts(data?.products);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout>
			<h1>Category Products</h1>
			<h2>{products?.length} results found</h2>
		</Layout>
	);
};

export default CategoryProducts;
