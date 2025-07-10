import { isValidSession } from '@/server/utils/isAuth';
import { mfaGenerate } from '@/server/controllers/sessions.js';

export default defineEventHandler(async (event) => {
    await isValidSession(event, true);

    return await mfaGenerate(event);
});
