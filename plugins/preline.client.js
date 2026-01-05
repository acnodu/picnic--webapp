export default defineNuxtPlugin(() => {
    const router = useRouter();

    router.afterEach(async () => {
        try {
            await import('preline/dist');
        } catch (e) {
            console.error('Preline library is not available.');
            console.error(e);
        }

        setTimeout(() => {
            if (
                typeof window !== 'undefined' &&
                window.HSStaticMethods &&
                typeof window.HSStaticMethods.autoInit === 'function'
            ) {
                window.HSStaticMethods.autoInit();
            }
        }, 0);
    });
});
