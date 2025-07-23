import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        picnic: {
            id: { type: String, required: true, unique: true },
            token: { type: String, required: true },
            requireMFA: { type: Boolean, default: true },
        },
        referral: {
            code: { type: String, required: true, unique: true },
            referredBy: { type: String, required: false },
        },
        basketCredits: {
            total: { type: Number, default: 1 },
            used: { type: Number, default: 0 },
            monthlyBonus: { type: Number, default: 1 },
            max: { type: Number, default: 5 },
        },
        isAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model('users', UsersSchema);
