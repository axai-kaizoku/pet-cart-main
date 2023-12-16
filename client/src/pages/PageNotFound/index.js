import React from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<Layout>
			<div className="page-not-found">
				<div className="inner-container">
					<div className="inner-container-inner">
						<h1>404</h1>
						<h2>Sorry, we couldn't find this page.</h2>
						<p>
							But don't worry, you can find plenty of other things on our Store.
						</p>
						<Link
							id="link"
							to="/store">
							Back to Store
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PageNotFound;
