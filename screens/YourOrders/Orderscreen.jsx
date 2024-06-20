import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { OrdersContext } from '../../utils/ordersContext'; // Adjust the path as necessary

const YourOrdersScreen = () => {
  const { orders, fetchOrders } = useContext(OrdersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
      setLoading(false);
    };
    loadOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      {item.products.map((product, index) => (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.orderTitle}>{product.productId.title}</Text>
          <Text style={styles.orderAuthor}>{product.productId.author}</Text>
          <Text style={styles.orderDate}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.orderPrice}>Price: ${product.productId.price}</Text>
        </View>
      ))}
      <Text style={styles.totalAmount}>Total Amount: ${item.totalAmount}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productContainer: {
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderAuthor: {
    fontSize: 16,
    color: '#777',
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'right',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourOrdersScreen;
