import axios from 'axios';
import axiosRetry from 'axios-retry';

export default defineNuxtPlugin((nuxtApp) => {
    // const config = useRuntimeConfig();

    axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

    const api = axios.create({
        baseURL: '/api',
    });

    api.interceptors.request.use((request) => {
        if (localStorage.getItem('token')) {
            request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return request;
    });

    api.interceptors.response.use(
        (response) => {
            if (response.headers.token) {
                const token = response.headers.authorization;
                localStorage.setItem('token', token);
            }

            return response.data;
        },
        (error) => {
            if (error.response?.status === 401 && window.location.pathname !== '/login') {
                localStorage.removeItem('token');
                window.location.replace('/login');
            }

            alert(error.response?.data?.statusMessage || 'An error occurred');

            return Promise.reject(error.response);
        }
    );

    return {
        provide: { api: api },
    };
});
