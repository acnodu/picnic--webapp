<template>
    <CoreCard
        title="Votre panier"
        class="h-full flex flex-col"
    >
        <div
            v-if="cart.length > 0"
            class="flex flex-col h-full"
        >
            <div class="flex items-top self-start">
                <span class="text-primary-700 font-semibold text-2xl"
                    >{{ totalWithDiscount }} €</span
                >
                <span class="text-gray-400 line-through text-lg">{{ totalAmount }} €</span>
            </div>

            <div class="my-auto text-gray-400 text-xs">
                Appliquer les réductions coûte un crédit.
            </div>

            <div class="self-end w-full">
                <CoreButton
                    class="w-full py-2 relative"
                    :to="{ name: 'checkout' }"
                >
                    <span class="relative inline-block mr-2">Appliquer</span>
                    <span
                        class="absolute right-1 top-1/2 -translate-y-1/2 bg-[#8F6E5E] p-1 rounded-md font-semibold"
                        >-10%</span
                    >
                </CoreButton>
            </div>
        </div>

        <div
            class="flex-1 flex flex-col justify-center text-center w-full px-0"
            v-else
        >
            <span class="font-semibold text-gray-600">Oops...</span>
            <span class="text-gray-400 text-sm">Votre panier picnic est vide.</span>
        </div>
    </CoreCard>
</template>

<script setup>
const totalAmount = computed(() => {
    return (props.cart?.reduce((total, item) => total + item.price, 0) / 100)
        .toFixed(2)
        .replace('.', ',');
});

const totalWithDiscount = computed(() => {
    return (props.cart?.reduce((total, item) => total + item.newPrice, 0) / 100)
        .toFixed(2)
        .replace('.', ',');
});

const props = defineProps({
    cart: {
        type: Array,
        default: () => [],
    },
});
</script>
