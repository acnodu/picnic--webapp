<template>
    <CoreCard>
        <div class="flex flex-col items-start relative w-full">
            <span
                class="text-sm sm:text-sm text-[#adadad]"
                v-if="cartItems.length === 0"
            >
                Votre panier picnic est vide, remplissez le puis revenez ici pour appliquer les
                réductions.
            </span>

            <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center justify-between w-full mb-2 bg-white rounded-lg pr-4 py-1"
            >
                <div class="flex items-center">
                    <img
                        :src="item.image"
                        alt="Product Image"
                        class="w-16 h-16 object-cover mx-1"
                    />
                    <div>
                        <div class="text-sm font-semibold">{{ item.name }}</div>
                        <p class="text-xs text-gray-500">
                            {{ item.unitQuantity || '' }} - {{ item.quantity }}x
                        </p>
                    </div>
                </div>
                <div class="text-base font-semibold text-gray-800 min-w-[60px] text-right">
                    {{ ((item.newPrice || item.price) / 100).toFixed(2).replace('.', ',') }}€
                </div>
            </div>

            <ButtonsApplyDiscounts :cart="cartItems" />
        </div>
    </CoreCard>
</template>

<script setup>
const totalPriceWithDiscount = computed(() => {
    return (
        cartItems.value.reduce((total, item) => {
            return total + (item.newPrice || item.price);
        }, 0) / 100
    )
        .toFixed(2)
        .replace('.', ',');
});

const totalPriceWithoutDiscount = computed(() => {
    return (
        cartItems.value.reduce((total, item) => {
            return total + item.price;
        }, 0) / 100
    )
        .toFixed(2)
        .replace('.', ',');
});

const cartItems = computed(() =>
    props.cart.map((item) => {
        const itemSdecorators = item.items[0].decorators || [];
        const quantityDecorator = itemSdecorators.find((d) => d.type === 'QUANTITY');
        const unitQuantityDecorator = itemSdecorators.find((d) => d.type === 'UNIT_QUANTITY');
        const promoDecorator = item.decorators?.find(
            (d) => d.type === 'PROMO' && d.text === '10% autre choix'
        );
        const priceDecorator = item.decorators?.find((d) => d.type === 'PRICE');

        return {
            id: item.items[0].id,
            name: item.items[0].name,
            price: item.display_price,
            quantity: quantityDecorator?.quantity || 1,
            unitQuantity: unitQuantityDecorator?.unit_quantity_text,
            promoIsApplied: !!promoDecorator,
            newPrice: priceDecorator?.display_price,
            image: `https://storefront-prod.fr.picnicinternational.com/static/images/${item.items[0].image_ids[0]}/padded-500x500.webp`,
        };
    })
);

const props = defineProps({
    cart: {
        type: Array,
        default: () => [],
    },
});
</script>
