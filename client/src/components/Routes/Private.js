import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';

export default function PrivateRoute() {
	const [ok, setOk] = useState(false);
	const [auth, setAuth] = useAuth();

	useEffect(() => {
		const authCheck = async () => {
			console.log('Problem is here on Private .js 13 line');

			const res = await axios.get('/api/v1/auth/profile');
			if (res.data.ok) {
				setOk(true);
				console.log('Problem is here on Private .js 20 line');
			} else {
				setOk(false);
				console.log('Problem is here on Private .js 24 line');
			}
			console.log('Problem is here on Private .js 33 line');
		};
		console.log('Problem is here on Private .js 35 line');
		console.log(auth?.token);
		if (auth?.token) authCheck();
		// eslint-disable-next-line
	}, [auth?.token]);

	return ok ? <Outlet /> : <Loading />;
}
