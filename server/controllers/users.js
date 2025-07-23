import Picnic from '../services/picnic.js';
import UsersService from '../services/users';
import jsonwebtoken from 'jsonwebtoken';

const { sign } = jsonwebtoken;

const getInfos = async (event) => {
    const picnic = new Picnic(event.context.user.picnic);
    const getUserInfos = await picnic.getUserInfos();

    const dbUserInfos = event.context.user;

    return {
        firstName: getUserInfos.firstname,
        lastName: getUserInfos.lastname,
        referral: dbUserInfos.referral,
        basketCredits: dbUserInfos.basketCredits,
        isAdmin: dbUserInfos.isAdmin,
        createdAt: dbUserInfos.createdAt,
    };
};

const addReferral = async (event) => {
    const { code } = await readBody(event);

    const userInfos = event.context.user;

    if (userInfos.referral.code === code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'You cannot refer yourself',
        });
    }

    if (userInfos.referral.referredBy) {
        throw createError({
            statusCode: 400,
            statusMessage: 'You have already been referred by someone',
        });
    }

    const referralUser = await UsersService.getByReferralCode(code);
    if (!referralUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Referral code not found',
        });
    }

    const newUserInfos = await UsersService.setReferralCode(userInfos._id, referralUser);

    event.context.user = newUserInfos;

    return await getInfos(event);
};

const login = async (event) => {
    const body = await readBody(event);

    const picnic = new Picnic();
    const loginPayload = await picnic.login(body);

    if (!loginPayload) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
    }

    let userInfos = await UsersService.getByPicnicId(loginPayload.userId);

    if (!userInfos) {
        userInfos = await UsersService.create({
            picnic: {
                id: loginPayload.userId,
                token: loginPayload.token,
            },

            referral: {
                code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            },
        });
    }

    const token = sign(
        {
            userId: userInfos._id,
            isAdmin: userInfos.isAdmin,
        },
        'prout',
        {
            expiresIn: '1d',
        }
    );

    setResponseHeader(event, 'token', token);

    return {
        requireMFA: userInfos.picnic.requireMFA,
    };
};

const generateMFA = async (event) => {
    const { type } = await readBody(event);

    const picnic = new Picnic(event.context.user.picnic);
    await picnic.generateMFA(type);
};

const verifyMFA = async (event) => {
    const { code } = await readBody(event);

    const picnic = new Picnic(event.context.user.picnic);
    await picnic.verifyMFA(code);
};

export default {
    login,
    generateMFA,
    verifyMFA,
    getInfos,
    addReferral,
};
