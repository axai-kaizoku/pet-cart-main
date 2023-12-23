import React from 'react';
import './styles.css';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';
import moment from 'moment';
import user from '../../assets/images/user.png';

const User = () => {
	const [auth] = useAuth();
	return (
		<Layout>
			<div className="container-fluid m-1.5 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="p-3">
							<div className="profile-card">
								<div className="profile-cover-img">
									<img
										src="//picsum.photos/id/237/1500/350"
										alt="Hello"
									/>
								</div>
								<div className="profile-user-img">
									<img
										src={user}
										alt="picsum"
									/>
									<div className="profile-details">
										<h6 id="created">
											Created At:{' '}
											{moment(auth?.user?.createdAt).format('DD/MM/YYYY')}
										</h6>
										<h6>{`${auth?.user?.firstName} ${auth?.user?.lastName}`}</h6>
										<h6>{auth?.user?.email}</h6>
										<h6>+91 {auth?.user?.phone}</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default User;
