import axios from 'axios';

// Create an Axios instance with a base URL
export const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});