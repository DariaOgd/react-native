import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const AddBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const bookCategories = ["Fiction", "Non-fiction", "Mystery", "Romance", "Fantasy", "Science Fiction", "Thriller", "Horror"];
  const bookStates = ["new", "used", "broken"];

  const handleAddBook = async () => {
    if (!title || !category || !price || !description || !state || !imageUri) {
      Alert.alert('Error', 'Please fill in all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('state', state);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust based on the type of the image
      name: 'photo.jpg', // Adjust based on the image name
    });

    try {
      const response = await axios.post('http://localhost:8800/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Book added successfully');
      // Clear the input fields
      setTitle('');
      setCategory('');
      setPrice('');
      setDescription('');
      setState('');
      setImageUri(null);
      // Optionally navigate back to the Home screen or another screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding book:', error);
      Alert.alert('Error', 'Failed to add book');
    }
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Book</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {bookCategories.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#999"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>State</Text>
      <Picker
        selectedValue={state}
        style={styles.input}
        onValueChange={(itemValue) => setState(itemValue)}
      >
        {bookStates.map((st, index) => (
          <Picker.Item key={index} label={st} value={st} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAddBook}>
        <Text style={styles.buttonText}>Add Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
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
  uploadButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddBookScreen;
