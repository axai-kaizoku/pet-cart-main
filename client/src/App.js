import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import Admin from './pages/Admin';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './pages/CreateCategory';
import CreateProduct from './pages/CreateProduct';
import Users from './pages/Users';
import User from './pages/User';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Products from './pages/Products';
import UpdateProduct from './pages/UpdateProduct';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/profile"
					element={<PrivateRoute />}>
					<Route
						path="user"
						element={<User />}
					/>
					<Route
						path="user/update"
						element={<Profile />}
					/>
					<Route
						path="user/orders"
						element={<Orders />}
					/>
				</Route>
				<Route
					path="/profile"
					element={<AdminRoute />}>
					<Route
						path="admin"
						element={<Admin />}
					/>
					<Route
						path="admin/create-category"
						element={<CreateCategory />}
					/>
					<Route
						path="admin/create-product"
						element={<CreateProduct />}
					/>
					<Route
						path="admin/update-product/:slug"
						element={<UpdateProduct />}
					/>
					<Route
						path="admin/products"
						element={<Products />}
					/>
					<Route
						path="admin/users"
						element={<Users />}
					/>
				</Route>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="*"
					element={<PageNotFound />}
				/>
			</Routes>
		</>
	);
}

export default App;
