import axios from 'axios';
import { TokenManager } from './tokenManager';

const API = axios.create({
    baseURL:  process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(config => {
    const token = TokenManager.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;