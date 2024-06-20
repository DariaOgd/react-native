import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { addToCart } from '../../api'; // Adjust the path as necessary

const BookInfoScreen = ({ route, navigation }) => {
  const { book } = route.params;

  const handleAddToCart = async () => {
    try {
      await addToCart(book._id, 1);
      Alert.alert('Success', 'Book added to cart successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add book to cart.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>

      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={1000} delay={500} style={styles.bookDetails}>
        {book.images && book.images.length > 0 && (
          <Image source={{ uri: book.images[0] }} style={styles.bookImage} />
        )}
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookCategory}>Category: {book.category}</Text>
        <Text style={styles.bookDescription}>{book.desc}</Text>
        <Text style={styles.bookPrice}>Price: ${book.price}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerBackText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookCategory: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  bookPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookInfoScreen;
