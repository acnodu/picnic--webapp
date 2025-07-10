<template>
    <div>
        <div v-if="!mfaType" class="max-w-sm space-y-3">
            <button
                class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
                @click="sendMFA('EMAIL')"
                :disabled="isLoading"
            >
                Recevoir le code par Email
            </button>
            <button
                class="w-full py-2 px-4 bg-green-500 text-white rounded-lg"
                @click="sendMFA('SMS')"
                :disabled="isLoading"
            >
                Recevoir le code par SMS
            </button>
        </div>

        <div v-else>
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

            <div class="text-center mt-2">
                <span class="text-xs underline cursor-pointer font-light" @click="mfaType = ''">
                    Je n'ai rien reçu
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const { $api } = useNuxtApp();

const isLoading = ref(false);
const code = ref('');
const mfaType = ref('');

const sendMFA = async (type) => {
    isLoading.value = true;

    await $api
        .post('/mfa/generate', { type })
        .then(() => {
            mfaType.value = type;
        })
        .catch((error) => {
            mfaType.value = '';
            console.error('Error sending MFA:', error);
        });

    isLoading.value = false;
};

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
