<template>
    <form @submit.prevent="handleLogin">
        <div class="space-y-3">
            <CoreInput
                :disabled="isLoading"
                v-model="mail"
                type="email"
                id="hs-floating-input-email-value"
                placeholder="Adresse mail"
            />

            <CoreInput
                :disabled="isLoading"
                v-model="password"
                type="password"
                id="hs-floating-input-password-value"
                placeholder="Mot de passe"
            />

            <CoreButton
                :disabled="isLoading"
                :isLoading="isLoading"
                type="submit"
                class="w-full"
                >Connexion
            </CoreButton>
        </div>
    </form>
</template>

<script setup>
const { $session } = useNuxtApp();

const emits = defineEmits(['updateMFA']);

const isLoading = ref(false);

const mail = ref('picnic@acnodu.fr');
const password = ref('Eqgn-_6opVgXbufP*GoQG_@ZXmqMCvij3g8');

const handleLogin = async () => {
    isLoading.value = true;
    await $session
        .create({ mail: mail.value, password: password.value })
        .then((data) => {
            emits('updateMFA', data.second_factor_authentication_required);
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>
