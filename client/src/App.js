import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/Routes/Private';
import Profile from './components/Profile';

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
						path=""
						element={<Profile />}
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
					path="*"
					element={<PageNotFound />}
				/>
			</Routes>
		</>
	);
}

export default App;
