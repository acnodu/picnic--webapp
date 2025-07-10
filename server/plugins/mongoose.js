import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig();

    if (mongoose.connection.readyState === 0) {
        console.log(config.mongodbUri);
        await mongoose.connect(config.mongodbUri);
    }
});
