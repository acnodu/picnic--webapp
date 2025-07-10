import SessionsService from '../services/sessions.js';
import jwt from 'jsonwebtoken';

const userLogin = async (event) => {
    const { email, password } = await readBody(event);
    const Sessions = new SessionsService({
        email,
    });

    const response = await Sessions.login({ password });

    if (!response) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
    }

    const token = await jwt.sign({ sessionId: response.sessionId, mfa: response.MFA }, 'prout', {
        expiresIn: '30d',
    });

    setResponseHeader(event, 'Authorization', token);

    return {
        MFA: response.MFA,
    };
};

export { userLogin };
