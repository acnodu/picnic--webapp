import { isValidSession } from '@/server/utils/isAuth';
import cartsController from '@/server/controllers/carts.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    return await cartsController.fetch(event);
});
