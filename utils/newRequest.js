// utils/newRequest.js
import axios from 'axios';
import { getToken } from './token';

const newRequest = axios.create({
  baseURL: 'http://localhost:8800/api',
});

newRequest.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;
