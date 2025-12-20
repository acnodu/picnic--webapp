<template>
    <CoreCard class="relative overflow-hidden">
        <div class="flex flex-row justify-between items-center">
            <div class="w-4/5">
                <h6 class="text-xs sm:text-sm font-semibold mb-1">
                    Partagez votre code de parainage et recevez 3 crédits
                </h6>

                <div class="text-xs text-gray-500 -mb-1">
                    Votre filleul recevra 3 crédits également.
                </div>
            </div>
        </div>

        <ExternalLink
            :size="60"
            :stroke-width="2"
            class="absolute bottom-1 right-1 text-[#A17F6A]/20"
        />
    </CoreCard>
</template>

<script setup>
import { ExternalLink } from 'lucide-vue-next';
</script>
