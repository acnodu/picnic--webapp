import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig();

    console.log('MONGODB_USERNAME:', process.env.MONGODB_USERNAME);
    console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
    console.log('MONGODB_HOST:', process.env.MONGODB_HOST);
    console.log('ENV:', process.env.ENV);
    console.log('NUXT_API_URL:', process.env.NUXT_API_URL);
    console.log('NUXT_APP_ENV:', process.env.NUXT_APP_ENV);

    if (mongoose.connection.readyState === 0) {
        console.log(config.mongodbUri);
        await mongoose.connect(config.mongodbUri);
    }
});
