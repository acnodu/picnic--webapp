import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.ENV}?retryWrites=true&w=majority`
        );
    }
});
