import { isValidSession } from '@/server/utils/isAuth';
import referralPutSchema from '../../schemas/referral.put';

import usersController from '@/server/controllers/users.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event);

    const body = await readBody(event);
    const { error } = referralPutSchema.safeParse(body);

    if (error) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid input data' })
        );
    }

    return await usersController.addReferral(event);
});
