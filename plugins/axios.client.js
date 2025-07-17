import axios from 'axios';
import axiosRetry from 'axios-retry';

function setupInterceptors(api) {
    api.interceptors.request.use((request) => {
        const token = document.cookie.split('; ').find((row) => row.startsWith('picnic-auth='));

        if (token) {
            const authToken = token.split('=')[1];
            request.headers['x-picnic-auth'] = authToken;
        }

        return request;
    });

    api.interceptors.response.use(
        (response) => {
            if (response.headers['x-picnic-auth']) {
                const token = response.headers['x-picnic-auth'];
                const payload = token.split('.')[1];

                try {
                    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

                    let expires = new Date(decoded.exp * 1000);
                    if (decoded['pc:2fa'] === 'NOT_VERIFIED') {
                        expires = new Date(decoded.iat * 1000 + 5 * 60 * 1000);
                    }

                    document.cookie = `picnic-auth=${token}; expires=${expires.toUTCString()}; path=/; samesite=strict`;
                } catch (e) {
                    console.warn('Impossible de décoder le JWT:', e);
                }
            }
            return response.data;
        },

        (error) => {
            if (error.response?.status === 401 && window.location.pathname !== '/login') {
                window.location.replace('/login');
            }
            alert(error.response?.data?.statusMessage || 'An error occurred');
            return Promise.reject(error.response);
        }
    );
    axiosRetry(api, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
}

export default defineNuxtPlugin((nuxtApp) => {
    const apiPicnic = axios.create({ baseURL: '/api/picnic' });
    const apiSession = axios.create({
        baseURL: '/api/sessions',
    });

    setupInterceptors(apiPicnic);
    setupInterceptors(apiSession);

    nuxtApp.provide('apiPicnic', apiPicnic);
    nuxtApp.provide('apiSession', apiSession);
});
