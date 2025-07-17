<template>
    <div>
        <LoginMainCard
            v-if="!MFARequired"
            @updateMFA="MFARequired = $event"
        />

        <LoginSelectMFATypeCard
            v-if="MFARequired && !MFAType"
            @updateMFAType="MFAType = $event"
        />

        <LoginValidMFACard
            v-if="MFARequired && MFAType"
            :MFAType="MFAType"
        />
    </div>
</template>

<script setup>
const MFARequired = ref(false);
const MFAType = ref(null);

onMounted(() => {
    const token = useCookie('picnic-auth');

    if (token.value) {
        try {
            const parsedToken = JSON.parse(atob(token.value.split('.')[1]));

            if (parsedToken && parsedToken['pc:2fa'] !== undefined) {
                MFARequired.value = parsedToken['pc:2fa'] === 'NOT_VERIFIED';
            } else {
                token.value = null;
            }
        } catch {
            token.value = null;
        }
    }
});

definePageMeta({
    layout: 'login',
});

useHead({
    titleTemplate: '%s - Connexion',
});
</script>
