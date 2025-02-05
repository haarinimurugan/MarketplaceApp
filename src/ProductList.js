import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Update product
  const updateProduct = async (id) => {
    const newName = prompt("Enter new product name:");
    if (!newName) return;

    try {
      await axios.put(`http://localhost:5000/product/${id}`, { name: newName });
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, name: newName } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={product._id} className="product">
            <h3>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <p className="product-description">Description: {product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-category">Category: {product.category}</p>

            {/* Line break after every third product */}
            {(index + 1) % 3 === 0 && <hr key={index} className="break-line" />}

            <button onClick={() => alert("Added to cart!")}>Add to cart</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
            <button onClick={() => updateProduct(product._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
