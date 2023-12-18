import React from 'react';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import { useAuth } from '../../context/auth';

const Home = () => {
	const [auth, setAuth] = useAuth();
	return (
		<Layout title="Home">
			<Banner />
			<h1>Homepage</h1>
			<pre>{JSON.stringify(auth, null, 4)}</pre>
		</Layout>
	);
};

export default Home;
