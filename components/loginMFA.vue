<template>
    <div class="max-w-sm space-y-3">
        <input
            :disabled="isLoading"
            type="text"
            class="border py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 text-center tracking-[.75em]"
            placeholder="••••••"
            maxlength="6"
            v-model="code"
            @input="code = code.replace(/[^0-9]/g, '')"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const { $api } = useNuxtApp();

const isLoading = ref(false);
const code = ref('');

const LoginMFA = async () => {
    isLoading.value = true;
    await $api
        .post('/mfa/verify', {
            code: code.value,
        })
        .then(() => {
            useRouter().push('/');
        })
        .catch((error) => {
            console.error('Login failed:', error);
        });

    isLoading.value = false;
};

watch(code, (newCode) => {
    if (newCode.length === 6) {
        LoginMFA();
    }
});
</script>
