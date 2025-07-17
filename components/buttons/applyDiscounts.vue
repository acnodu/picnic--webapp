<template>
    <div
        v-if="cart.length > 0"
        class="w-full mt-2"
    >
        <button
            class="w-full py-2 px-4 bg-[#A17F6A] text-white text-md font-medium rounded-lg flex items-center justify-center disabled:bg-[#c8b4b4] relative overflow-hidden"
            :disabled="isApplying"
            @click="applyPromotions"
        >
            <span
                v-if="!isApplying"
                class="relative z-10"
                >Appliquer les promotions</span
            >
            <span
                v-else
                class="relative z-10"
                >Application des promotions...</span
            >
            <div
                v-if="isApplying"
                class="absolute left-0 top-0 h-full bg-[#A17F6A] transition-width duration-500"
                :style="{ width: progress + '%' }"
            />
        </button>
    </div>
</template>

<script setup>
const { $session } = useNuxtApp();

const isApplying = ref(false);
const progress = ref(0);

const availableDiscounts = computed(() => {
    return props.cart.filter((item) => !item.promoIsApplied) || [];
});

const countPercentageItems = computed(() => {
    return availableDiscounts.value.reduce((count) => {
        return count + 1;
    }, 0);
});

const applyPromotions = async () => {
    isApplying.value = true;
    progress.value = 0;

    for (let i = 0; i < availableDiscounts.value.length; i++) {
        const item = availableDiscounts.value[i];

        await $session.removeProductFromCart(item.id, item.quantity);
        await $session.addProductToCartWithDiscount(item.id);

        if (item.quantity > 1) {
            await $session.addProductToCartWithoutDiscount(item.id, item.quantity - 1);
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        progress.value = ((i + 1) / countPercentageItems.value) * 100;
    }
};

const props = defineProps({
    cart: {
        type: Object,
        required: true,
    },
});
</script>
