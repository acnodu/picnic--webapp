<template>
    <img src="/assets/images/logo.png" alt="Logo Picnic" class="mx-auto mb-4 w-40 h-40" />

    <h1 class="block text-2xl font-bold text-gray-800">{{ title }}</h1>

    <p v-if="subtitle" class="mt-2 text-sm text-gray-600">
        {{ subtitle }}
    </p>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
        default: '',
    },
});
</script>
