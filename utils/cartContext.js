import React, { createContext, useState, useEffect } from 'react';
import { getCartItems } from '../api'; // Adjust the path as necessary

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const cartData = await getCartItems();
      setCartItems(cartData.products);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
