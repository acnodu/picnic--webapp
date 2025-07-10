import SessionModel from '../models/sessions';
import jwt from 'jsonwebtoken';

class Users {
    constructor({ token = null } = {}) {
        this.token = token;
        this.email = null;
    }

    async createSession({ MFA = false, email }) {
        const decodedToken = jwt.decode(this.token);

        const session = new SessionModel({
            token: this.token,
            email,
            MFA,
            exp: new Date(decodedToken.exp * 1000),
        });

        try {
            const user = await session.save();

            const token = jwt.sign({ sessionId: user._id, MFA: user.MFA }, 'prout', {
                expiresIn: '5m',
            });

            return token;
        } catch {
            throw new Error('Failed to create user session');
        }
    }
}

export default Users;
