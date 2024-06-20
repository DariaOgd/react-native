import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Token stored:', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token retrieved:', token);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
};
