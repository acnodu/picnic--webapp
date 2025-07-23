export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return;

    const token = localStorage.getItem('token') || '';

    if (!token && to.path === '/login') {
        return;
    }

    if (!token && to.path !== '/login') {
        return navigateTo('/login');
    }

    try {
        const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

        if (decodedToken.userId && to.path === '/login') {
            return navigateTo('/');
        }
    } catch {
        localStorage.removeItem('token');
        return navigateTo('/login');
    }
});
