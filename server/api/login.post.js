import loginSchema from '../schemas/login.post';
import usersController from '~/server/controllers/users';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { error } = loginSchema.safeParse(body);

    if (error) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid input data' })
        );
    }

    return await usersController.login(event);
});
