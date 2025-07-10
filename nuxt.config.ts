import tailwindcss from '@tailwindcss/vite';

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
