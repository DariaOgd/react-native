import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Animated, Easing, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { getBooks, addToCart } from '../../api';

const categories = [
  { id: '1', name: 'Fiction', image: 'https://media.npr.org/assets/img/2021/08/13/711gd93ifkl_custom-80dd66e555a05cf605f043ca0095760a75d41be4.jpeg?s=800&c=85&f=jpeg' },
  { id: '2', name: 'Non-Fiction', image: 'https://m.media-amazon.com/images/I/51GcCcx0WHL._AC_UF894,1000_QL80_.jpg' },
  { id: '3', name: 'Mystery', image: 'https://shereads.com/wp-content/uploads/2021/10/TheMaid_NitaProse.jpg' },
  { id: '4', name: 'Romance', image: 'https://hips.hearstapps.com/hmg-prod/images/first-1677087451.jpeg?crop=1.00xw:0.992xh;0,0&resize=980:*' },
  { id: '5', name: 'Fantasy', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1646849115-41oigHHgNAL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980:*' },
  { id: '6', name: 'Science Fiction', image: 'https://www.weareteachers.com/wp-content/uploads/electric-kingdom-685x1024.jpg' },
  { id: '7', name: 'Thriller', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1555351547-41bsvxNUSdL.jpg?crop=1xw:0.987xh;center,top&resize=980:*' },
  { id: '8', name: 'Horror', image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1623170865-9780307743657.jpg?crop=1xw:1xh;center,top&resize=980:*' },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const animationValue = useRef(new Animated.Value(0)).current;
  const cartIconRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response);
        setFilteredBooks(response);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredBooks(books.filter(book => book.category === selectedCategory));
    } else {
      setFilteredBooks(books.filter(book => book.title.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, selectedCategory, books]);

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

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      startAnimation();
    } catch (error) {
      alert('Failed to add book to cart.');
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item.name)}>
      <ImageBackground source={{ uri: item.image }} style={styles.categoryImage} imageStyle={{ borderRadius: 10 }}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderBookItem = ({ item }) => (
    (!selectedCategory || item.category === selectedCategory) && (
      <TouchableOpacity style={styles.bookContainer} onPress={() => navigation.navigate('Book', { book: item })}>
        {item.images && item.images.length > 0 && (
          <Image source={{ uri: item.images[0] }} style={styles.bookImage} />
        )}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <Text style={styles.bookPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item._id)}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
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
        {selectedCategory && (
          <TouchableOpacity style={styles.resetButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.resetButtonText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.booksContainer}>
        <FlatList
          data={filteredBooks}
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
  resetButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  booksContainer: {
    marginHorizontal: 20,
  },
  booksList: {
    paddingBottom: 20,
  },
  bookContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Added for box shadow effect
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10, // Space between image and details
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
    backgroundColor: 'transparent',
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
    top: 50,
    right: 30,
  },
});

export default HomeScreen;
