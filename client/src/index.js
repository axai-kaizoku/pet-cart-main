import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { LoadProvider } from './context/load';
import 'antd/dist/reset.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'producction') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<LoadProvider>
		<AuthProvider>
			<SearchProvider>
				<CartProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</CartProvider>
			</SearchProvider>
		</AuthProvider>
	</LoadProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
