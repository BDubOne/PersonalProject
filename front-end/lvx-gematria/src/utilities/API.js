import axios from 'axios';

// Create an Axios instance with a base URL
export const API = axios.create({
	baseURL: 'https://lvx-gematria.com/api/v1/',
	withCredentials: true,
});
