import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const Loading = ({ path = 'login' }) => {
	const [count, setCount] = useState(3);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevValue) => --prevValue);
		}, 1000);
		count === 0 &&
			navigate(`/${path}`, {
				state: location.pathname,
			});
		return () => clearInterval(interval);
	}, [count, navigate, location, path]);
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
