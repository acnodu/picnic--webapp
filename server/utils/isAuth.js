import { getHeader, createError } from 'h3';
import jwt from 'jsonwebtoken';

import UsersSchema from '../models/users';

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

        let userInfos = await UsersSchema.findById(decoded.userId);
        if (!userInfos) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Session not found.',
            });
        }

        userInfos = userInfos.toJSON();

        if (userInfos.picnic.requireMFA !== withMFA) {
            throw createError({
                statusCode: 401,
                statusMessage: 'MFA requirement mismatch.',
            });
        }

        event.context.user = userInfos;
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
