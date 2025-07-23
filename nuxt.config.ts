import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],
    vite: {
        plugins: [tailwindcss()],
    },
    css: ['~/assets/css/custom.css'],
    devServer: {
        port: 8080,
    },
    app: {
        head: {
            title: 'Ragondin',
            link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
    },
});
