<template>
    <CoreCard>
        <div v-if="cart.length > 0">
            <CartItemCard v-for="item in cart" :key="item.id" :item="item" />
        </div>

        <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                />
            </svg>
            <div class="text-lg font-semibold">Votre panier est vide</div>
        </div>
    </CoreCard>
</template>

<script setup>
defineProps({
    cart: {
        type: Array,
        required: true,
    },
});
</script>
