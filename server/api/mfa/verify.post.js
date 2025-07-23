import verifyMFASchema from '../../schemas/verifyMFA.post';
import { isValidSession } from '@/server/utils/isAuth';
import usersController from '~/server/controllers/users';

export default defineEventHandler(async (event) => {
    await isValidSession(event, true);

    const body = await readBody(event);
    const { error } = verifyMFASchema.safeParse(body);

    if (error) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid input data' })
        );
    }

    await usersController.verifyMFA(event);
});
