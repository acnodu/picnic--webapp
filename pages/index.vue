<template>
    <div>
        <MainTitle title="Accueil" />

        <div class="flex flex-col gap-4">
            <HomeShareReferralCard
                v-if="userStore.infos.referral && !userStore.infos.referral?.referredBy"
            />

            <HomeAddReferralCard />

            <div class="flex flex-row gap-4 h-full">
                <div class="w-1/2 h-full aspect-square">
                    <HomeCartResumeCard :cart="cartStore.items" />
                </div>

                <div class="w-1/2 h-full flex flex-col gap-4 aspect-square">
                    <div class="flex-1">
                        <CoreCard
                            title="Vos crédits"
                            class="h-full relative"
                        >
                            <div class="absolute bottom-2 text-4xl font-bold text-[#A17F6A]">3</div>

                            <Coins
                                class="absolute bottom-2 right-2 text-[#A17F6A]/20"
                                :size="55"
                                :stroke-width="2"
                            />
                        </CoreCard>
                    </div>
                    <div class="flex-1">
                        <CoreCard
                            title="Vos économies"
                            class="h-full relative"
                        >
                            <div class="absolute bottom-2 text-4xl font-bold text-[#5C8B50]">
                                120,42
                            </div>

                            <Euro
                                class="absolute bottom-2 right-2 text-[#A17F6A]/20"
                                :size="55"
                                :stroke-width="2"
                            />
                        </CoreCard>
                    </div>
                </div>
            </div>

            <HomeMonthlyBonusCard />
        </div>
    </div>
</template>

<script setup>
import { useCartStore, useUserStore } from '#imports';
import { Coins, Euro } from 'lucide-vue-next';

const userStore = useUserStore();
const cartStore = useCartStore();

onMounted(async () => {
    await userStore.init();
    await cartStore.init();
});
</script>
