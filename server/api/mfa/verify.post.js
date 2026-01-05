import { isValidSession } from '@/server/utils/isAuth';
import { mfaVerify } from '@/server/controllers/sessions.js';
import MFAVerifySchema from '../../validation/mfaVerifySchema.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event, true);

    const body = await readBody(event);
    const { error } = MFAVerifySchema.safeParse(body);

    if (error) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid input data' })
        );
    }

    console.log('ok')
    
    return await mfaVerify(event);
});
