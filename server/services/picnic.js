import axios from 'axios';
import uuid from 'uuid-random';
import { config } from './../config';

class Picnic {
    constructor({ token = null, email = null, sessionId = null } = {}) {
        this.token = token;
        this.email = email;
        this.sessionId = sessionId;

        this.client = axios.create({
            baseURL: 'https://storefront-prod.fr.picnicinternational.com/api/15',
            timeout: 25000,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': 'fr',
                'Accept-Encoding': 'gzip, deflate',
                'x-picnic-agent': '20100;1.216.1-21167',
            },
            proxy: {
                protocol: config.proxy.protocol,
                host: config.proxy.host,
                port: config.proxy.port,
                auth: {
                    username: config.proxy.username,
                    password: config.proxy.password,
                },
            },
        });

        this.client.interceptors.request.use((config) => {
            config.headers['x-picnic-did'] = uuid().toUpperCase();
            return config;
        });
    }

    async getCart() {
        const response = await this._get('/cart');
        return response?.items || [];
    }

    async removeFromCart(productId) {
        await this._post(`/cart/remove_product`, {
            product_id: productId,
            selling_unit_contexts: [],
            count: 1,
        });

        return this.getCart();
    }

    async addToCart(productId, isDiscount = false) {
        if (isDiscount) {
            await this._addToCartWithDiscount(productId);
        } else {
            await this._post(`/cart/add_product`, {
                product_id: productId,
                selling_unit_contexts: [],
                count: 1,
            });
        }

        return this.getCart();
    }

    async _addToCartWithDiscount(productId) {
        await this._post(`/pages/task/add-alternative-selling-unit`, {
            payload: {
                unavailable_selling_unit_id: productId,
                alternative_selling_unit_id: productId,
            },
        });
    }

    async _post(url, data) {
        try {
            if (this.token) {
                this.client.defaults.headers.common['x-picnic-auth'] = this.token;
            }
            return await this.client.post(url, data);
        } catch (error) {
            if (error.response.status >= 400 && error.response.status < 500) {
                console.log(error);
                return null;
            }

            throw new Error('Failed to communicate with Picnic API');
        }
    }

    async _get(url) {
        try {
            if (this.token) {
                this.client.defaults.headers.common['x-picnic-auth'] = this.token;
            }
            const response = await this.client.get(url);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response.status >= 400 && error.response.status < 500) {
                return null;
            }

            throw new Error('Failed to communicate with Picnic API');
        }
    }
}

export default Picnic;
