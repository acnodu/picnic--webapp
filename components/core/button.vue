<template>
    <button
        type="button"
        class="py-3 px-4 justify-center inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
        :class="classes"
    >
        <span
            v-if="isLoading"
            class="animate-spin inline-block size-4 border-3 border-current border-t-transparent rounded-full"
            role="status"
            aria-label="loading"
        >
            <span class="sr-only">Loading...</span>
        </span>

        <span v-else>
            <slot />
        </span>
    </button>
</template>

<script setup>
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
        default: 'primary',
    },
});

const classes = computed(() => {
    return (
        {
            primary: 'bg-[#A17F6A] text-white hover:bg-[#8F6E5E] focus:bg-[#7D5F4D];',
        }[props.variant] || ''
    );
});
</script>
