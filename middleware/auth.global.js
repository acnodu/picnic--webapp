export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return;

    console.log('prout');
    const token = localStorage.getItem('token') || '';
    console.log(token);
    if (!token && to.path === '/login') {
        console.log('cacatine');
        return;
    }

    if (!token && to.path !== '/login') {
        console.log('du pipi qui sent le caca');

        return navigateTo('/login');
    }

    try {
        console.log('g pipi');
        const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
        console.log(decodedToken);
        if (decodedToken.userId && to.path === '/login') {
            return navigateTo('/');
        }
    } catch (e) {
        console.log(e);
        console.log('un gros pet');
        localStorage.removeItem('token');
        return navigateTo('/login');
    }
});
