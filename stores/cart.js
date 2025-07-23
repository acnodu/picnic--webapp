import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    actions: {
        async init() {
            await this.fetchItems();
        },

        async fetchItems() {
            const { $api } = useNuxtApp();

            await $api.get('/users/cart').then((response) => {
                this.items = response;
            });
        },
    },
});
