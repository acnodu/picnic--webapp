import axios from 'axios';
import md5 from 'crypto-js/md5';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import UsersSchema from '../models/users';

class Picnic {
    constructor({ token = null } = {}) {
        this.token = token;
        this.axios = axios.create({
            baseURL: 'https://storefront-prod.fr.picnicinternational.com/api/15',
            timeout: 10000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'fr',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'Picnic/1.15.310 (iOS; iPhone; iOS 16.6; Scale/3.00)',
                'x-picnic-agent': '20100;1.15.310-21062',
            },
            proxy: {
                protocol: 'http',
                host: 'p.webshare.io',
                port: 80,
                auth: {
                    username: 'nxjvnhjn-FR-rotate',
                    password: 'xqey772lnv50',
                },
            },
        });

        this.axios.interceptors.response.use(this._interceptResponse.bind(this));
        this.axios.interceptors.request.use((config) => {
            if (this.token) config.headers['x-picnic-auth'] = this.token;
            config.headers['x-picnic-did'] = uuidv4();

            return config;
        });
    }

    async getCart() {
        const res = await this._get('/cart');
        if (!res) return null;

        return res.data;
    }

    async getFormatedCart() {
        const cart = await this.getCart();
        if (!cart) return null;

        return cart.items.map((item) => {
            const itemSdecorators = item.items[0].decorators || [];
            const quantityDecorator = itemSdecorators.find((d) => d.type === 'QUANTITY');
            const unitQuantityDecorator = itemSdecorators.find((d) => d.type === 'UNIT_QUANTITY');
            const promoDecorator = item.decorators?.find(
                (d) => d.type === 'PROMO' && d.text === '10% autre choix'
            );
            const otherPromoDecorator = item.decorators?.find(
                (d) => d.type === 'PROMO' && d.text !== '10% autre choix'
            );
            const priceDecorator = item.decorators?.find((d) => d.type === 'PRICE');

            return {
                id: item.items[0].id,
                name: item.items[0].name,
                price: item.display_price,
                quantity: quantityDecorator?.quantity || 1,
                unitQuantity: unitQuantityDecorator?.unit_quantity_text,
                promoIsApplied: !!promoDecorator,
                alreadyDiscounted: !!otherPromoDecorator,
                newPrice: priceDecorator?.display_price,
                image: `https://storefront-prod.fr.picnicinternational.com/static/images/${item.items[0].image_ids[0]}/padded-500x500.webp`,
                discountPercentage: priceDecorator
                    ? Math.round(
                          ((item.display_price - priceDecorator.display_price) /
                              item.display_price) *
                              100
                      )
                    : 0,
            };
        });
    }

    async applyDiscount(itemId) {
        await this.removeItem(itemId, 1);

        await this._post('/pages/task/add-alternative-selling-unit', {
            payload: {
                unavailable_selling_unit_id: 's1051765',
                alternative_selling_unit_id: itemId,
            },
        });
    }

    async removeItem(itemId, quantity) {
        await this._post('/cart/remove_product', {
            product_id: itemId,
            selling_unit_contexts: [],
            count: quantity,
        });
    }

    async getUserInfos() {
        const res = await this._get('/user');
        if (!res) return null;

        return res.data;
    }

    async login({ email, password }) {
        const hashedPassword = md5(password).toString();

        const res = await this._post('/user/login', {
            client_id: '20100',
            client_version: '1.196.0',
            device_id: uuidv4(),
            device_name: 'notAvailable',
            key: email,
            secret: hashedPassword,
        });

        if (!res) return null;

        return {
            token: res.headers['x-picnic-auth'],
            userId: res.data.user_id,
            requireMFA: res.data.second_factor_authentication_required,
        };
    }

    async generateMFA(channel) {
        const res = await this._post('/user/2fa/generate', {
            channel,
        });

        if (!res) return null;
        return res.data;
    }

    async verifyMFA(otp) {
        const res = await this._post('/user/2fa/verify', {
            otp,
        });

        if (!res) return null;
        return true;
    }

    async _get(url, params = {}) {
        try {
            return this.axios.get(url, { params });
        } catch (error) {
            if (error.response?.status >= 400 && error.response?.status < 500) {
                return null;
            }

            throw new Error('Failed to communicate with Picnic API');
        }
    }

    async _post(url, data = {}) {
        try {
            return await this.axios.post(url, data);
        } catch (error) {
            if (error.response?.status >= 400 && error.response?.status < 500) {
                return null;
            }

            throw new Error('Failed to communicate with Picnic API');
        }
    }

    async _interceptResponse(response) {
        if (
            ['/user/login', '/user/2fa/generate'].includes(response.config.url) ||
            !response.headers['x-picnic-auth']
        )
            return response;

        if (response.headers['x-picnic-auth']) {
            const token = response.headers['x-picnic-auth'];
            const decodedToken = jwt.decode(token);

            if (decodedToken && decodedToken['pc:2fa'] === 'VERIFIED') {
                await UsersSchema.findOneAndUpdate(
                    { 'picnic.id': decodedToken.sub },
                    { 'picnic.token': token, 'picnic.requireMFA': false }
                );
            }
        }
    }
}

export default Picnic;
