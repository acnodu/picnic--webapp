import titleVisible from '~/directives/titleIsVisible';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('main-title', titleVisible);
});
