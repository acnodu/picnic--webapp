import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const SessionsSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        email: { type: String, required: true },
        token: { type: String, required: true, unique: true },
        MFA: { type: Boolean, default: false },
        exp: { type: Date, required: true, expires: 0 },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model('sessions', SessionsSchema);
