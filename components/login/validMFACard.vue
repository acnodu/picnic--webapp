<template>
    <CoreCard class="border border-[#DEE2E6]">
        <div class="text-center">
            <LoginHeader
                title="Validez votre connexion"
                subtitle="Vous disposez de 5 minutes pour saisir le code reçu par mail ou sms."
            />

            <LoginValidMFAForm @MFAisValid="MFAisValid" />
        </div>
    </CoreCard>
</template>

<script setup>
const MFAisValid = () => {
    useRouter().push('/');
};
</script>
