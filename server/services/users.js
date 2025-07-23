import UsersSchema from '../models/users';

const getByReferralCode = async (code) => {
    return UsersSchema.findOne({ 'referral.code': code });
};

const getByPicnicId = async (picnicId) => {
    return UsersSchema.findOne({ 'picnic.id': picnicId });
};

const setReferralCode = async (userId, referralUser) => {
    const userInfos = await UsersSchema.findByIdAndUpdate(
        userId,
        {
            $set: {
                'referral.referredBy': referralUser.referral.code,
            },
            $inc: {
                'basketCredits.total': 3,
            },
        },
        { new: true }
    );
    if (!userInfos) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        });
    }

    const newReferralUser = await UsersSchema.findByIdAndUpdate(
        referralUser._id,
        {
            $inc: {
                'basketCredits.total': 3,
            },
        },
        { new: true }
    );

    if (!newReferralUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        });
    }

    return userInfos;
};

const create = async (payload) => {
    const user = new UsersSchema(payload);
    return user.save();
};

export default {
    getByPicnicId,
    create,
    getByReferralCode,
    setReferralCode,
};
