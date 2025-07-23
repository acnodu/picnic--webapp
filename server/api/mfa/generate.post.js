import generateMFASchema from '../../schemas/generateMFA.post';
import { isValidSession } from '@/server/utils/isAuth';
import usersController from '~/server/controllers/users';

export default defineEventHandler(async (event) => {
    await isValidSession(event, true);

    const body = await readBody(event);
    const { error } = generateMFASchema.safeParse(body);

    if (error) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid input data' })
        );
    }

    const resp = await usersController.generateMFA(event);

    console.log(resp);

    return resp;
});
