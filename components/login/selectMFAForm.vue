<template>
    <div>
        <CoreButton
            :disabled="isLoading"
            :isLoading="MFAType === type.value && isLoading"
            class="w-full mb-2"
            @click="sendMFA(type.value)"
            v-for="type in MFATypes"
            :key="type.value"
        >
            {{ type.label }}
        </CoreButton>
    </div>
</template>

<script setup>
const { $session } = useNuxtApp();

const emits = defineEmits(['updateMFAType']);

const MFATypes = [
    { label: 'Par SMS', value: 'SMS' },
    { label: 'Par Mail', value: 'EMAIL' },
];

const MFAType = ref(null);
const isLoading = ref(false);

const sendMFA = async (type) => {
    MFAType.value = type;
    isLoading.value = true;

    await $session
        .sendMFA(type)
        .then(() => {
            emits('updateMFAType', type);
        })
        .catch((error) => {
            console.error("Erreur lors de l'envoi du MFA:", error);
            // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>
