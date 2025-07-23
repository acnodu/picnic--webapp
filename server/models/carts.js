import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

import UsersSchema from '@/server/models/users.js';

const CartsSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        userId: { type: String, required: true },
        items: { type: Array, default: [] },
        totalWithoutDiscount: { type: Number, default: 0 },
        totalWithDiscount: { type: Number, default: 0 },
        totalDiscount: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
    },
    {
        toJSON: {
            getters: true,
        },
    },
    {
        versionKey: false,
    }
);

CartsSchema.pre('save', async function (next) {
    if (this.isNew) {
        const test = await UsersSchema.findByIdAndUpdate(
            this.userId,
            { $inc: { 'basketCredits.total': -1, 'basketCredits.used': 1 } },
            { new: true }
        );

        console.log(test);
    }

    next();
});

export default mongoose.model('carts', CartsSchema);
