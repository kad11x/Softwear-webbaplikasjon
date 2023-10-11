import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000' // Bytt ut med din faktiske API-URL
});

export default api;
