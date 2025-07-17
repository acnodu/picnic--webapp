<template>
    <div>
        <MainTitle title="Mon panier" />

        <CartCard :cart="cart.items" />
    </div>
</template>

<script setup>
const { $session } = useNuxtApp();

const cart = ref([]);

onMounted(async () => {
    cart.value = await $session.getCart();
});
</script>
