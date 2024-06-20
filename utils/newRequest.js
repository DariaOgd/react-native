import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'http://localhost:8800/api/', // Replace with your server URL
  withCredentials: true, // Allow credentials (cookies) to be sent with requests
});

export default newRequest;
