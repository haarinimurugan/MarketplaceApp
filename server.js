

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error(err));

// Define Product Schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: {
		type: Number,
		required: true
	},
	category: String,
	imageUrl: String, // Directly store image URL
});

const Product = mongoose.model('Product', productSchema);

// Middleware for CORS
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json());

// Route to fetch products
app.get('/product', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

// Route to add new product
app.post('/product', async (req, res) => {
	try {
		const { name, description, price, category, imageUrl } = req.body;
		const newProduct = new Product({
			name,
			description,
			price,
			category,
			imageUrl,
		});
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

app.put('/:id', async (req,res) =>{
	const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
	if(!product){
		return res.status(404).json({message:"not found"})
	}
	return res.json(product)
})


app.delete('/:id', async (req,res) =>{
	const product = await Product.findByIdAndDelete(req.params.id);
     if(!product){
		return res.status(404).json("not found")
	 }
	 ret
})
// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
