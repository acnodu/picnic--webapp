<template>
    <div class="relative">
        <input
            :value="isLoading ? '' : modelValue"
            @input="updateValue"
            :class="[
                'py-2.5 sm:py-3 px-4 border block w-full border-gray-200 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ',
                isLoading ? 'opacity-50' : '',
            ]"
            :placeholder="placeholder"
            :disabled="isLoading"
            :type="type"
        />
        <div
            v-if="isLoading"
            class="absolute inset-0 flex items-center border border-gray-200 justify-center rounded-lg bg-white pointer-events-none"
        >
            <div
                class="animate-spin w-6 h-6 border-4 border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
            >
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    isLoading: Boolean,
    placeholder: {
        type: String,
        default: 'Input search',
    },
    type: {
        type: String,
        default: 'text',
    },
});
const emit = defineEmits(['update:modelValue']);

const modelValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        modelValue.value = newValue;
    }
);

const updateValue = (event) => {
    modelValue.value = event.target.value;
    emit('update:modelValue', modelValue.value);
};
</script>
