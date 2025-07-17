<template>
    <CoreCard class="border border-[#DEE2E6]">
        <div class="text-center">
            <LoginHeader
                title="Prout"
                subtitle="j'aime manger mon caca"
            />

            <LoginForm @updateMFA="emits('updateMFA', $event)" />
        </div>
    </CoreCard>

    <div class="text-center mt-4">
        <p class="text-xs text-gray-500">
            <span class="ml-2">
                Nous ne stockons aucune informations sur vous, ni sur vos actions. Toutes les
                données transitent uniquement entre vous et picnic.
            </span>
        </p>
    </div>
</template>

<script setup>
const emits = defineEmits(['updateMFA']);
</script>
