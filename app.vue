<template>
    <NuxtLayout />
</template>

<script setup>
useHead({
    meta: [
        {
            name: 'description',
            content:
                'Profitez de -10% sur Picnic gratuitement ! Connectez-vous pour appliquer automatiquement une réduction sur votre panier Picnic. Service simple, rapide et sans frais.',
        },
        {
            name: 'keywords',
            content:
                'Picnic, réduction Picnic, code promo Picnic, -10%, gratuit, panier Picnic, économie, application réduction',
        },
        {
            property: 'og:title',
            content: 'Réduction Picnic de -10% gratuitement',
        },
        {
            property: 'og:description',
            content:
                'Obtenez -10% sur votre commande Picnic sans rien payer. Connectez-vous et appliquez la réduction en un clic !',
        },
        {
            property: 'og:image',
            content: '/assets/images/logo.png',
        },
        {
            property: 'og:type',
            content: 'website',
        },
    ],
});
</script>
