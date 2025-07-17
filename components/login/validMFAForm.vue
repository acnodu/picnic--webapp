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

const { $session } = useNuxtApp();

const emits = defineEmits(['MFAisValid']);

const code = ref('');
const isLoading = ref(false);

const submitCode = async () => {
    isLoading.value = true;

    await $session
        .validateMFA(code.value)
        .then(() => {
            emits('MFAisValid', false);
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
