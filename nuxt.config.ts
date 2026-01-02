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
            apiUrl: '/api',
            appEnv: 'dev',
        },
    },
    app: {
        head: {
            title: "Ragondin c'est malin",
            link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
    },
});
