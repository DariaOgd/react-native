import newRequest from './utils/newRequest'
import { getToken } from './utils/token';
import axios from 'axios';
export const loginUser = async (email, password) => {
  try {
    const response = await newRequest.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await newRequest.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
export const getBooks = async () => {
  try {
    const response = await newRequest.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const token = await getToken();
    const response = await axios.post('http://localhost:8800/api/cart/add', {
      productId,
      quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:8800/api/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:8800/api/orders/create', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
export const removeFromCart = async (productId) => {
  try {
    const response = await axios.post('http://localhost:8800/api/cart/remove', { productId });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};


export const getUserOrders = async (userId) => {
  try {
    const response = await axios.get('http://localhost:8800/api/orders/user', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.post('http://localhost:8800/api/cart/clear');
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
// Add other API methods as needed
