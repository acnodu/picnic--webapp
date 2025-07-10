<template>
    <form @submit.prevent="handleLogin">
        <div class="grid gap-y-4">
            <div>
                <div class="max-w-sm space-y-3">
                    <!-- Floating Input -->
                    <div class="relative">
                        <input
                            v-model="email"
                            type="email"
                            id="hs-floating-input-email-value"
                            class="border peer p-4 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        />
                        <label
                            for="hs-floating-input-email-value"
                            class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >Email</label
                        >
                    </div>

                    <div class="relative">
                        <input
                            v-model="password"
                            type="password"
                            id="hs-floating-input-passowrd-value"
                            class="peer p-4 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            placeholder="********"
                        />
                        <label
                            for="hs-floating-input-passowrd-value"
                            class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >Password</label
                        >
                    </div>
                </div>
            </div>

            <button
                type="submit"
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
                Sign in
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
const { $api } = useNuxtApp();

const email = ref('');
const password = ref('');

const emit = defineEmits(['setMFA']);

const handleLogin = async (e) => {
    e.preventDefault();

    $api.post('/login', {
        email: email.value,
        password: password.value,
    })
        .then((response) => {
            emit('setMFA', response.MFA);
        })
        .catch((error) => {
            console.error('Login failed:', error);
        });
};
</script>
