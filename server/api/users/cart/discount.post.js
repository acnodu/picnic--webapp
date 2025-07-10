import { isValidSession } from '@/server/utils/isAuth';
import { discountItem } from '@/server/controllers/cart.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    return await discountItem(event);
});
