import mongoose from 'mongoose';
import { config, generateConfig } from '../config';

export default defineNitroPlugin(async () => {
    await generateConfig();

    console.log(process.env.ENV);
    console.log(config);

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(
            `mongodb+srv://${config.mongoUsername}:${config.mongoPassword}@${config.mongoHost}/${
                process.env.ENV || 'dev'
            }?retryWrites=true&w=majority`
        );
    }
});
