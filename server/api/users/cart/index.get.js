import { isValidSession } from '@/server/utils/isAuth';
import { getCart } from '@/server/controllers/cart.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    return await getCart(event);
});
