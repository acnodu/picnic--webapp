<template>
    <div
        class="bg-[#ffffff] py-2 pl-1 pr-3 rounded-xl mb-3 last:mb-0 border-2"
        :class="item.promoApplied ? 'border-[#6A9956]' : 'border-transparent'"
    >
        <div class="flex items-center space-x-2">
            <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1">
                <h2 class="text-sm font-semibold">{{ item.name }}</h2>
                <p class="text-xs text-gray-600">{{ item.quantity }} x {{ item.unitQuantity }}</p>
            </div>
            <div class="text-right">
                <p
                    v-if="item.promoApplied"
                    class="text-[#EA7E5C]"
                    :class="item.promoApplied ? 'text-xs line-through' : 'text-sm'"
                >
                    {{ (item.price / 100).toFixed(2) }} €
                </p>
                <p
                    class="text-sm font-bold"
                    :class="item.promoApplied ? 'text-[#6A9956]' : 'text-[#EA7E5C]'"
                >
                    {{ (item.newPrice / 100).toFixed(2) }} €
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>
