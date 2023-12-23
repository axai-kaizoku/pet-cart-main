import React from 'react';

import './styles.css';

const Loading = ({ isLoading = false }) => {
	if (!isLoading) return null;
	return (
		<>
			<div className="loading-container">
				<div className="loading-container-inner1">
					<div className="loading-container-inner2">
						<span className="loading"></span>
					</div>
				</div>
			</div>
			<div className="loading-background"></div>
		</>
	);
};

export default Loading;
