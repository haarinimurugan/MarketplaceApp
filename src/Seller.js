import React, { useState } from 'react';
import axios from 'axios';

const Seller = () => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		imageUrl: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/product',
				formData);
			console.log(response.data);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<div>
			<h2>Become a Seller</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name"
					placeholder="Product Name" onChange={handleChange} />
				<input type="text" name="description"
					placeholder="Description" onChange={handleChange} />
				<input type="number" name="price"
					placeholder="Price" onChange={handleChange} />
				<input type="text" name="category"
					placeholder="Category" onChange={handleChange} />
				<input type="text" name="imageUrl"
					placeholder="Image URL" onChange={handleChange} />
				<button type="submit">Add Product</button>
			</form>
		</div>
	);
}

export default Seller;
