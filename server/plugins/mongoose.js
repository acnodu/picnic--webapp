import mongoose from 'mongoose';
import { config } from '../config';

export default defineNitroPlugin(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(`mongodb://${config.mongoHost}/${config.mongoUser}`, {
            user: config.mongoUser,
            pass: config.mongoPass,
            authSource: 'admin',
            replicaSet: 'replicaset',
        });
    }
});
