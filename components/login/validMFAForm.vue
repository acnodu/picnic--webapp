<template>
    <CoreInput
        v-model="code"
        type="tel"
        placeholder="Entrez le code reçu"
        class="mt-4 w-full max-w-xs mx-auto"
        :maxlength="6"
        :isLoading="isLoading"
        autocomplete="off"
    />
</template>

<script setup>
import { ref, watch } from 'vue';

const { $api } = useNuxtApp();

const emits = defineEmits(['MFAisValid']);

const code = ref('');
const isLoading = ref(false);

const submitCode = async () => {
    isLoading.value = true;

    await $api
        .post('/mfa/verify', { code: code.value })
        .then(() => {
            console.log('ok');
            emits('MFAisValid', true);
        })
        .finally(() => {
            isLoading.value = false;
        });
};

watch(code, (newVal) => {
    if (newVal.length === 6) {
        submitCode();
    }
});
</script>
