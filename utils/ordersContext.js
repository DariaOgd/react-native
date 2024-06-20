import React, { createContext, useState, useEffect } from 'react';
import { getUserOrders } from '../api'; // Adjust the path as necessary

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = '6623e6342c1f4f96950d98ce'; // Use your static user ID
      const fetchedOrders = await getUserOrders(userId);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
