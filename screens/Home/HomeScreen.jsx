import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Animated, Easing, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { getBooks } from '../../api'; // Adjust the path as necessary

const categories = [
  { id: '1', name: 'Fiction', image: 'https://media.npr.org/assets/img/2021/08/13/711gd93ifkl_custom-80dd66e555a05cf605f043ca0095760a75d41be4.jpeg?s=800&c=85&f=jpeg' },
  { id: '2', name: 'Non-Fiction', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Science', image: 'https://via.placeholder.com/150' },
  // add more categories
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [books, setBooks] = useState([]);
  const animationValue = useRef(new Animated.Value(0)).current;
  const cartIconRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animationValue.setValue(0);
      setIsAnimating(false);
    });
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <ImageBackground source={{ uri: item.image }} style={styles.categoryImage} imageStyle={{ borderRadius: 10 }}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookContainer} onPress={() => navigation.navigate('Book', { book: item })}>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            startAnimation();
            // Implement adding item to cart logic
          }}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const cartIconPosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity ref={cartIconRef} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search your books..."
          placeholderTextColor="#999"
          onChangeText={setSearch}
          value={search}
        />
        <TouchableOpacity>
          <Ionicons name="options" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Shop Today!</Text>
        <Text style={styles.bannerSubText}>Free Delivery</Text>
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      <View style={styles.booksContainer}>
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.booksList}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.fullScreenModal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); navigation.navigate('Profile'); }}>
              <Text style={styles.modalButtonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); navigation.navigate('Orders'); }}>
              <Text style={styles.modalButtonText}>Your Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {isAnimating && (
        <Animatable.View
          animation="slideInDown"
          duration={600}
          style={[styles.animatedIcon, { transform: [{ translateY: cartIconPosition }] }]}
        >
          <Ionicons name="cart" size={28} color="#d32f2f" />
        </Animatable.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  banner: {
    backgroundColor: '#e1bee7',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
  bannerSubText: {
    fontSize: 16,
    color: '#7b1fa2',
  },
  categoriesContainer: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryCard: {
    width: 120,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  booksContainer: {
    marginHorizontal: 20,
  },
  booksList: {
    paddingBottom: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Added for box shadow effect
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  bookPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  addToCartButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: 'transparent', // Remove purple background
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animatedIcon: {
    position: 'absolute',
    top: 50, // Adjust this value to position the icon correctly
    right: 30, // Adjust this value to position the icon correctly
  },
});

export default HomeScreen;
