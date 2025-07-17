<template>
    <div
        v-main-title
        :class="{ 'text-black': !showTitle, 'text-white': showTitle }"
        class="mb-6 mt-2 accel-gpu transition-colors"
    >
        <h1 class="text-2xl font-bold">{{ title }}</h1>
    </div>
</template>

<script setup>
const showTitle = useTitleIsVisible();

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});

onMounted(() => {
    useTitle().value = props.title;
});
</script>
