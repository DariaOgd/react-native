import newRequest from './utils/newRequest'

export const loginUser = async (email, password) => {
  try {
    const response = await newRequest.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await newRequest.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Example: Fetch Books
export const fetchBooks = async () => {
  try {
    const response = await newRequest.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBooks = () => api.get('/products');

// Add other API methods as needed
