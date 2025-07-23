import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        infos: {},
    }),
    actions: {
        async init() {
            await this.fetchInfos();
        },

        async fetchInfos() {
            const { $api } = useNuxtApp();

            await $api.get('/users').then((response) => {
                this.infos = response;
            });
        },
    },
});
