import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Nav from './Nav.js';
import ProductList from './ProductList.js';
import Seller from './Seller.js';
import './index.css'

const App = () => {
	return (
		<Router>
			<div>
				<Nav />
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/seller" element={<Seller />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
