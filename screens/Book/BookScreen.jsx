import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const BookInfoScreen = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerBackText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Info</Text>
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>by {book.author}</Text>
        <Text style={styles.bookDescription}>{book.description}</Text>
        <Text style={styles.bookSeller}>Seller: {book.seller}</Text>
        <Text style={styles.bookPrice}>Price: {book.price}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  bookSeller: {
    fontSize: 16,
    color: '#777',
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
