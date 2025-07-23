import { isValidSession } from '@/server/utils/isAuth';
import usersController from '@/server/controllers/users.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    return await usersController.getInfos(event);
});
