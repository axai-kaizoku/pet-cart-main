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
			const res = await axios.get('/api/v1/auth/profile');
			if (res.data.ok) {
				setOk(true);
			} else {
				setOk(false);
			}
		};

		if (auth?.token) authCheck();
		return;
		// eslint-disable-next-line
	}, [auth?.token]);

	return ok ? <Outlet /> : <Loading />;
}
