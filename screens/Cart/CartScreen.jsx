import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { CartContext } from '../../utils/cartContext';
import { OrdersContext } from '../../utils/ordersContext';
import { createOrder, removeFromCart, clearCart } from '../../api';

const CartScreen = ({ navigation }) => {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const { fetchOrders } = useContext(OrdersContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchCartItems();
    }
  }, [isFocused]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  };

  const handleDelete = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCartItems();
      Alert.alert('Success', 'Item removed from cart!');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart.');
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemTitle}>{item.productId.title}</Text>
      <Text style={styles.cartItemPrice}>${(item.productId.price * item.quantity).toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.productId._id)}>
        <Ionicons name="trash" size={24} color="#d32f2f" />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty. Please add items to the cart before checking out.');
      return;
    }

    const totalAmount = calculateTotal();
    const orderData = {
      userId: '6623e6342c1f4f96950d98ce',
      products: cartItems.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
      totalAmount,
      address,
      city: 'City',
      zipCode: 'ZipCode',
      country: 'Country',
      cardNumber,
      expiryDate,
      cvv,
    };

    try {
      const order = await createOrder(orderData);
      Alert.alert('Success', 'Order created successfully!');
      await clearCart();
      fetchCartItems();
      fetchOrders();
      setShowSuccessMessage(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to create order.');
    }
  };

  const handleAnimationEnd = () => {
    setShowSuccessMessage(false);
    navigation.navigate('Home');
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
        keyExtractor={(item) => item.productId._id}
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
          <TouchableOpacity
            style={[styles.checkoutButton, { opacity: cartItems.length === 0 ? 0.5 : 1 }]}
            onPress={handleCheckout}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      {showSuccessMessage && (
        <Animatable.View
          animation="slideInDown"
          duration={800}
          style={styles.successMessageContainer}
          onAnimationEnd={handleAnimationEnd}
        >
          <Text style={styles.successMessage}>Payment Successful!</Text>
        </Animatable.View>
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
  successMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
