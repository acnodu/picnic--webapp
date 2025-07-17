<template>
    <header class="fixed accel-gpu top-0 left-0 w-full z-50 bg-white py-3">
        <CoreContainer class="flex items-center">
            <span class="mr-2 flex items-center text-primary-600">
                <Menu @click="toggleMenu" />
            </span>

            <Transition
                name="slide-fade"
                appear
            >
                <h1
                    v-if="showTitle"
                    class="text-md font-semibold"
                >
                    <slot>{{ title }}</slot>
                </h1>
            </Transition>
        </CoreContainer>
    </header>
</template>

<script setup>
import { Menu } from 'lucide-vue-next';
const emits = defineEmits(['toggle-menu']);
const showTitle = useTitleIsVisible();
const title = useTitle();

const toggleMenu = () => {
    console.log('ok');
    emits('toggle-menu');
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-leave-active {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-24px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
