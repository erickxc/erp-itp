import axios from 'axios';

const api = axios.create({
  // Mude para 3001
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('@ITP:token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;