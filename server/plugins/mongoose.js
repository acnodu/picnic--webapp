import mongoose from 'mongoose';
import { config, generateConfig } from '../config';

export default defineNitroPlugin(async () => {
    if (mongoose.connection.readyState === 0) {
        await generateConfig();

        await mongoose.connect(
            `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}/${config.mongoUser}
            }?authSource=admin`
        );
    }
});
