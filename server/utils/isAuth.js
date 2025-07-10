import { getHeader, createError } from 'h3';
import jwt from 'jsonwebtoken';

import SessionModel from '../models/sessions';

export const isUser = (event) => {
    const authHeader = getHeader(event, 'authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            statusMessage: 'No authorization header provided or invalid format.',
        });
    }
};

export const isValidSession = async (event, withMFA = false) => {
    const authHeader = getHeader(event, 'authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            statusMessage: 'No authorization header provided or invalid format.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'prout');

        let session = await SessionModel.findById(decoded.sessionId);
        if (!session) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Session not found.',
            });
        }

        session = session.toJSON();

        if (session.MFA !== withMFA) {
            throw createError({
                statusCode: 401,
                statusMessage: 'MFA requirement mismatch.',
            });
        }

        event.context.session = {
            sessionId: session._id,
            email: session.email,
            token: session.token,
            MFA: session.MFA,
        };
    } catch (err) {
        if (err.statusCode && err.statusMessage) {
            throw err;
        }
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid or expired token.',
        });
    }
};
