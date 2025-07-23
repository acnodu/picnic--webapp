import Picnic from '../services/picnic.js';
import Carts from '../services/carts.js';

const fetch = async (event) => {
    const picnic = new Picnic(event.context.user.picnic);
    const cart = await picnic.getFormatedCart();

    if (!cart) {
        throw createError({ statusCode: 404, statusMessage: 'Cart not found' });
    }

    return cart;
};

const applyDiscount = async (event) => {
    if (event.context.user.basketCredits.total <= 0) {
        throw createError({ statusCode: 400, statusMessage: 'No basket credits available' });
    }

    const picnic = new Picnic(event.context.user.picnic);
    const cart = await picnic.getFormatedCart();

    const eligibleForDiscount = cart.filter((item) => {
        return !item.promoIsApplied && !item.alreadyDiscounted;
    });

    if (eligibleForDiscount.length === 0) {
        throw createError({ statusCode: 400, statusMessage: 'No items eligible for discount' });
    }

    for (const item of eligibleForDiscount) {
        await picnic.applyDiscount(item.id, item.quantity);
    }

    const newCart = await picnic.getFormatedCart();

    const cartService = new Carts(event.context.user);
    await cartService.create(newCart);

    return newCart;
};

export default {
    fetch,
    applyDiscount,
};
