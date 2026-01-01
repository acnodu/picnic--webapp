import mongoose from 'mongoose';
import { config, generateConfig } from '../config';

export default defineNitroPlugin(async () => {
    if (mongoose.connection.readyState === 0) {
        await generateConfig();

        await mongoose.connect(
            `mongodb+srv://${config.mongoUsername}:${config.mongoPassword}@${config.mongoHost}/${
                process.env.ENV || 'dev'
            }?replicaSet=replicaset&authSource=admin`
        );
    }
});
