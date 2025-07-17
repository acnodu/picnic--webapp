import { useTitleIsVisible } from '~/composables/title';

export default {
    mounted(el) {
        const onScroll = () => {
            useTitleIsVisible().value = window.scrollY >= 5;
        };

        window.addEventListener('scroll', onScroll);
        el._onScroll = onScroll;
    },
    unmounted(el) {
        if (el._onScroll) window.removeEventListener('scroll', el._onScroll);
    },
};
