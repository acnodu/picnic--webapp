import { isValidSession } from '@/server/utils/isAuth';
import cartsController from '@/server/controllers/carts';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    return await cartsController.applyDiscount(event);
});
