<template>
    <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div class="p-4 sm:p-7">
            <div class="text-center">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo Picnic"
                    class="mx-auto mb-4 w-40 h-40"
                />

                <h1 class="block text-2xl font-bold text-gray-800">Connectez-vous !</h1>
                <p v-if="needMFA" class="mt-2 text-sm text-gray-600">
                    On y est presque !<br />
                    Merci de saisir le code reçu par message.
                </p>
                <p v-else class="mt-2 text-sm text-gray-600">
                    Connectez-vous avec votre compte
                    <span class="font-semibold text-[#fe2d2d]">picnic</span>. Nous ne stockons pas
                    votre mot de passe.
                </p>
            </div>

            <div class="mt-5">
                <Login @set-m-f-a="setMFA" v-if="!needMFA" />
                <LoginMFA v-if="needMFA" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';

const needMFA = ref(false);

const setMFA = (mfa) => {
    needMFA.value = mfa;
};

definePageMeta({
    layout: 'login',
    title: 'Réduction Picnic -10% Gratuit | Connexion',
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

onMounted(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
        const decoded = jwtDecode(token);
        if (decoded.mfa) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.iat + 300 < currentTime) {
                localStorage.removeItem('token');
                return;
            }

            needMFA.value = true;
        }
    } catch (error) {
        console.error('Token decoding failed:', error);
        localStorage.removeItem('token');
    }
});
</script>
