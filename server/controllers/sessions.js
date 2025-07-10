import jwt from 'jsonwebtoken';
import SessionsService from '../services/sessions.js';

const mfaVerify = async (event) => {
    const { code } = await readBody(event);
    const Sessions = new SessionsService(event.context.session);

    const response = await Sessions.verifyMFA(code);

    if (!response) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: 'Invalid MFA code' })
        );
    }

    const token = await jwt.sign({ sessionId: response.sessionId, mfa: response.MFA }, 'prout', {
        expiresIn: '30d',
    });

    setResponseHeader(event, 'Authorization', token);

    return {
        MFA: response.MFA,
    };
};

export { mfaVerify };
