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
