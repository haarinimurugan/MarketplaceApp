import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart items on component mount to get the number of items in the cart
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCartCount(response.data.length); // Assuming cart data is an array
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">
        Marketplace
      </h1>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/seller" className="nav-link">
            Become a Seller
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
