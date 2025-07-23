import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

if (typeof window === 'undefined') {
    global.FormData = require('form-data');
}

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use((request) => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => {
        if (typeof window !== 'undefined' && response.headers.authorization) {
            const token = response.headers.authorization.split(' ')[1];
            localStorage.setItem('token', token);
        }
        return response.data;
    },
    (error) => {
        if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // window.location.replace('/login');
        }
        return Promise.reject(error.response);
    }
);

export { api };
