import { useNuxtApp } from '#app';
import MD5 from 'crypto-js/md5';
import { v4 as uuidv4 } from 'uuid';

export default defineNuxtPlugin((nuxtApp) => {
    const { $apiSession } = nuxtApp;

    const create = async ({ mail, password }) => {
        $apiSession.defaults.headers.common['picnic-email'] = mail;

        return await $apiSession.post('/user/login', {
            client_id: '20100',
            client_version: '1.15.310',
            device_id: uuidv4(),
            device_name: 'notAvailable',
            key: mail,
            secret: MD5(password).toString(),
        });
    };

    const sendMFA = async (channel) => {
        $apiSession.defaults.headers.common['picnic-email'] = 'picnic@acnodu.fr';

        return await $apiSession.post('/user/2fa/generate', {
            channel,
        });
    };

    const validateMFA = async (otp) => {
        $apiSession.defaults.headers.common['picnic-email'] = 'picnic@acnodu.fr';

        return await $apiSession.post('/user/2fa/verify', {
            otp,
        });
    };

    const getCart = async () => {
        return await $apiSession.get('/cart');
    };

    const removeProductFromCart = async (productId, quantity) => {
        return await $apiSession.post(`/cart/remove_product`, {
            product_id: productId,
            selling_unit_contexts: [],
            count: quantity,
        });
    };

    const addProductToCartWithDiscount = async (productId) => {
        $apiSession.defaults.headers.common['x-picnic-did'] = uuidv4();

        return await $apiSession.post(`/pages/task/add-alternative-selling-unit`, {
            payload: {
                unavailable_selling_unit_id: productId,
                alternative_selling_unit_id: productId,
                quantity: 1,
            },
        });
    };

    const addProductToCartWithoutDiscount = async (productId, quantity) => {
        $apiSession.defaults.headers.common['x-picnic-did'] = uuidv4();

        return await $apiSession.post(`/cart/add_product`, {
            count: quantity,
            product_id: productId,
        });
    };

    nuxtApp.provide('session', {
        create,
        sendMFA,
        validateMFA,
        getCart,
        removeProductFromCart,
        addProductToCartWithoutDiscount,
        addProductToCartWithDiscount,
    });
});
