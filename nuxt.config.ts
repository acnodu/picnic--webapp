import tailwindcss from '@tailwindcss/vite';

console.log('MONGODB_USERNAME:', process.env.MONGODB_USERNAME);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGODB_HOST:', process.env.MONGODB_HOST);
console.log('ENV:', process.env.ENV);
console.log('NUXT_API_URL:', process.env.NUXT_API_URL);
console.log('NUXT_APP_ENV:', process.env.NUXT_APP_ENV);

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss"],
  vite: {
    plugins: [tailwindcss()],
  },
  devServer: {
        port: 8080,
    },
  css: ["@/assets/css/custom.css"],
  runtimeConfig: {
    mongodbUri: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.ENV}?retryWrites=true&w=majority`,
    public: {
        apiUrl: process.env.NUXT_API_URL || '/api',
        appEnv: process.env.NUXT_APP_ENV || 'prod',
    },

  }
});
