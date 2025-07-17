export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie('picnic-auth');

    if (token.value === '' && to.path === '/login') {
        return;
    }

    if (!token.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    try {
        const decodedToken = token.value ? JSON.parse(atob(token.value.split('.')[1])) : null;

        if (decodedToken['pc:2fa'] === 'NOT_VERIFIED' && to.path !== '/login') {
            return navigateTo('/login');
        }

        if (decodedToken['pc:2fa'] === 'VERIFIED' && to.path === '/login') {
            return navigateTo('/');
        }
    } catch {
        token.value = '';
        return navigateTo('/login');
    }
});
