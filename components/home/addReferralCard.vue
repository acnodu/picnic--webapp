<template>
    <CoreCard class="relative overflow-hidden">
        <div class="flex flex-row justify-between items-center">
            <div class="w-4/5">
                <h2 class="text-md font-semibold mb-1">
                    Partagez votre code de parainage et recevez 3 crédits
                </h2>

                <div class="text-xs text-gray-500 -mb-1">
                    Votre filleul recevra 3 crédits également.
                </div>
            </div>
        </div>

        <UserPlus
            :size="100"
            :stroke-width="2"
            class="absolute -bottom-4 right-1 text-[#A17F6A]/20"
        />
    </CoreCard>
</template>

<script setup>
import { UserPlus } from 'lucide-vue-next';
</script>
