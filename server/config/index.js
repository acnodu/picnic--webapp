// import dotenv
import dotenv from 'dotenv';

// load .env file
dotenv.config();

const config = {
    mongoHost: process.env.MONGO_HOST,
    mongoPass: process.env.MONGO_PASS,
    mongoUser: process.env.MONGO_USER,
    proxy: {
        host: process.env.PROXY_HOST,
        password: process.env.PROXY_PASS,
        port: process.env.PROXY_PORT,
        protocol: process.env.PROXY_PROTOCOL,
        username: process.env.PROXY_USER,
    },
};

export { config };
