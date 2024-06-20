import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const userOrders = [
  { id: '1', title: 'Book Title 1', author: 'Author 1', date: '2023-01-01', price: '$10' },
  { id: '2', title: 'Book Title 2', author: 'Author 2', date: '2023-02-15', price: '$15' },
  // Add more orders
];

const YourOrdersScreen = () => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderTitle}>{item.title}</Text>
      <Text style={styles.orderAuthor}>{item.author}</Text>
      <Text style={styles.orderDate}>Date: {item.date}</Text>
      <Text style={styles.orderPrice}>Price: {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={userOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderAuthor: {
    fontSize: 14,
    color: '#555',
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default YourOrdersScreen;
