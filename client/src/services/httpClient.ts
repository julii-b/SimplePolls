/*
// httpClient example for future use:

import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://api.example.com', // Change to your API base
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: 10 seconds timeout
});

// Optional: attach user-token automatically
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;
*/