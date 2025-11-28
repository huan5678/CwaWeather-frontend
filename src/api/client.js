import axios from 'axios';

// Create an Axios instance with default configuration
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Fallback to relative path for proxy usage if env var missing
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const weatherApi = {
  getWeather: (cityId) => client.get(`/weather/${cityId}`),
  getCities: () => client.get('/cities'),
};

export default client;
