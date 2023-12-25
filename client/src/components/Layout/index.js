import React from 'react';
import './styles.css';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title = '' }) => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="This is an e-commerce app for your pet's needs"
				/>
				<meta
					name="keywords"
					content="Ecommerce, React, MongoDb, Express, Node, Pets, PetCart"
				/>
				<meta
					name="author"
					content="axai-kaizoku"></meta>
				<title>PetCart</title>
			</Helmet>
			<Header />
			<main
				id="layout-background"
				style={{ minHeight: '100vh' }}>
				<Toaster />
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
