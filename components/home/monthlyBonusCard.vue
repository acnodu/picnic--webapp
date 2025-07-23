<template>
    <CoreCard class="relative overflow-hidden">
        <div class="flex flex-row justify-between items-center">
            <div class="w-4/5">
                <h2 class="text-md font-semibold mb-1">
                    Tous les mois, nous vous offrons un crédit supplémentaire !
                </h2>
                <div class="text-xs text-gray-500 -mb-1">
                    Vous ne pouvez pas avoir + de 3 crédits offerts.
                </div>
            </div>
        </div>
        <Gift
            :size="80"
            :stroke-width="2"
            class="absolute -bottom-2 -right-1 text-[#A17F6A]/20 animate-shake -rotate-10"
        />
    </CoreCard>
</template>

<script setup>
import { Gift } from 'lucide-vue-next';
</script>

<style scoped>
@keyframes shake {
    0% {
        transform: rotate(0deg);
    }
    5% {
        transform: rotate(-10deg);
    }
    10% {
        transform: rotate(10deg);
    }
    15% {
        transform: rotate(-10deg);
    }
    20% {
        transform: rotate(10deg);
    }
    25% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
.animate-shake {
    animation: shake 2.5s infinite;
}
</style>
