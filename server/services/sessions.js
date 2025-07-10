import axios from 'axios';
import crypto from 'crypto';

import SessionModel from '../models/sessions';

class Sessions {
    constructor({ token = null, email = null, sessionId = null } = {}) {
        this.token = token;
        this.email = email;
        this.sessionId = sessionId;
        this.client = axios.create({
            baseURL: 'https://gateway-prod.global.picnicinternational.com/api/15',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': 'fr',
                'Accept-Encoding': 'gzip, deflate',
                'x-picnic-agent': '20100;1.15.310-21062',
            },
        });

        this.client.interceptors.response.use(this._interceptResponse.bind(this));
    }

    async login({ password }) {
        const payload = {
            client_id: '20100',
            client_version: '1.15.310',
            device_id: 'E3ADEDAF-3000-469D-908D-C4AC70A09C56',
            device_name: 'notAvailable',
            key: this.email,
            secret: crypto.createHash('md5').update(password).digest('hex'),
        };

        this.client.defaults.headers.common['picnic-email'] = this.email;

        const res = await this._post('/user/login', payload);

        if (!res) return null;

        return res.data;
    }

    async sendMFA() {
        await this._post('/user/2fa/generate', {
            channel: 'SMS',
        });
    }

    async verifyMFA(otp) {
        this.client.defaults.headers.common['picnic-email'] = this.email;

        const res = await this._post('/user/2fa/verify', { otp: otp });
        if (!res) return null;

        return res.data;
    }

    async _post(url, data) {
        try {
            if (this.token) {
                this.client.defaults.headers.common['x-picnic-auth'] = this.token;
            }
            return await this.client.post(url, data);
        } catch (error) {
            console.log('-----------');
            console.log(error);
            if (error.response?.status >= 400 && error.response?.status < 500) {
                return null;
            }

            throw new Error('Failed to communicate with Picnic API');
        }
    }

    async _interceptResponse(response) {
        if (
            !['/user/login', '/user/2fa/verify'].includes(response.config.url) &&
            response.status === 200
        )
            return response;

        if (response.headers['x-picnic-auth']) {
            const token = response.headers['x-picnic-auth'];

            console.log(response.data);
            this.token = token;
            const requireMFA = response.data.second_factor_authentication_required || false;

            const expiration = requireMFA
                ? new Date(Date.now() + 5 * 60 * 1000)
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

            let savedSession;
            if (this.sessionId) {
                savedSession = await SessionModel.findByIdAndUpdate(
                    this.sessionId,
                    {
                        email: this.email,
                        token: token,
                        MFA: requireMFA,
                        exp: expiration,
                    },
                    { new: true, upsert: true }
                );
            } else {
                savedSession = new SessionModel({
                    email: this.email,
                    token: token,
                    MFA: requireMFA,
                    exp: expiration,
                });
                await savedSession.save();
            }

            this.sessionId = savedSession._id;

            if (requireMFA) {
                await this.sendMFA();
            }

            response.data = {
                sessionId: this.sessionId,
                MFA: requireMFA,
            };
        }

        return response;
    }
}

export default Sessions;
