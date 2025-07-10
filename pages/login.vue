<template>
    <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div class="p-4 sm:p-7">
            <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800">Se connecter</h1>
                <p class="mt-2 text-sm text-gray-600">
                    {{
                        !needMFA
                            ? 'Connectez-vous avec votre compte Picnic pour continuer.'
                            : 'Saisissez le code reçu par SMS pour vous connecter.'
                    }}
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
    if (token) {
        const decoded = jwtDecode(token);
        needMFA.value = decoded.mfa;

        if (decoded.mfa === false) {
            useRouter().push('/');
        }
    }
});
</script>
