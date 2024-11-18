import axios from 'axios';

const API = axios.create({
    baseURL: "https://your.api.endpoint/",
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;
