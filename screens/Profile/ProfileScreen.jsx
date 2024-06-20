import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  addedBooks: [
    { id: '1', title: 'Book Title 1', author: 'Author 1' },
    { id: '2', title: 'Book Title 2', author: 'Author 2' },
    // Add more books
  ],
};

const ProfileScreen = () => {
  const renderBookItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.sectionTitle}>Books Added by You:</Text>
      <FlatList
        data={user.addedBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.booksList}
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
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  booksList: {
    paddingBottom: 20,
  },
  bookContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfileScreen;
