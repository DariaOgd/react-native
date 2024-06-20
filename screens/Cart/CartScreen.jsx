import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialCartItems = [
  { id: '1', title: 'Book Title 1', price: 10 },
  { id: '2', title: 'Book Title 2', price: 15 },
  // add more cart items
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  const handleDelete = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash" size={24} color="#d32f2f" />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    // Implement your checkout logic here
    // For example, validate inputs and process the payment
    console.log('Address:', address);
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);
    alert('Checkout successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />
      <TouchableOpacity style={styles.expandButton} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.expandButtonText}>{isExpanded ? 'Hide Payment Details' : 'Enter Payment Details'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.expandedSection}>
          <TextInput
            style={styles.input}
            placeholder="Shipping Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
          />
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
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
  cartList: {
    paddingBottom: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  expandButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedSection: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    elevation: 2,
  },
  checkoutButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
