import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
    vite: {
        plugins: [tailwindcss()],
    },
    devServer: {
        port: 8080,
    },
    css: ['@/assets/css/custom.css'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_API_URL || '/api',
            appEnv: process.env.NUXT_APP_ENV || 'prod',
        },
    },
    app: {
        head: {
            title: "Ragondin c'est malin",
            link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
        },
    },
});
