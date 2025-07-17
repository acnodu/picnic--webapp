<template>
    <div class="bg-[#f4f4f4] p-4 rounded-2xl mb-4">
        <div
            v-if="title"
            class="flex items-center mb-3 text-black"
        >
            <span
                v-if="icon"
                class="mr-2 flex items-center"
            >
                <component
                    :is="icon"
                    class="w-5 h-5"
                />
            </span>

            <h2 class="font-semibold text-md">{{ title }}</h2>
        </div>

        <slot />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: '',
    },
    icon: {
        type: [Object, Function, String],
        default: null,
    },
});
</script>
