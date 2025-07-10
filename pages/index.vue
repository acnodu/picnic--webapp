<template>
    <div>
        <div class="min-h-screen flex flex-col pb-bottom-safe-area">
            <MainTitle>Mon panier</MainTitle>

            <CartCard
                :cart="cart"
                :class="[
                    isLoading || underDiscountApplication
                        ? 'filter grayscale pointer-events-none opacity-60'
                        : '',
                ]"
            />

            <div class="flex items-center justify-between px-4 mb-2" v-if="cart.length > 0">
                <span class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Total du panier
                </span>
                <div class="flex items-end gap-2 text-[#EA7E5C]">
                    <span v-if="hasPromoApplied" class="text-xs line-through">
                        {{ (cartTotalWithoutPromo / 100).toFixed(2) }} €
                    </span>
                    <span
                        class="text-md font-bold leading-none"
                        :class="hasPromoApplied ? 'text-[#6A9956] ' : 'text-[#EA7E5C]'"
                    >
                        {{ (cartTotal / 100).toFixed(2) }} €
                    </span>
                </div>
            </div>
        </div>

        <div class="fixed bottom-0 left-0 w-full bg-white shadow z-10 bottom-safe-area">
            <CoreContainer class="flex-1 p-4">
                <div class="max-w-4xl mx-auto flex justify-center">
                    <button
                        type="button"
                        class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        @click="applyDiscount"
                    >
                        {{
                            underDiscountApplication
                                ? `${discountApplied} produit(s) sur ${cart.length}...`
                                : 'Appliquer la réduction'
                        }}
                    </button>
                </div>
            </CoreContainer>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { jwtDecode } from 'jwt-decode';

const { $api } = useNuxtApp();

const isLoading = ref(false);
const underDiscountApplication = ref(false);
const discountApplied = ref(0);
const cart = ref([]);

const hasPromoApplied = computed(() => {
    return cart.value.some((item) => item.promoApplied);
});
const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => {
        return total + (item.newPrice || item.price);
    }, 0);
});
const cartTotalWithoutPromo = computed(() => {
    return cart.value.reduce((total, item) => {
        return total + item.price;
    }, 0);
});

const applyDiscount = async () => {
    underDiscountApplication.value = true;
    await fetchCartItems();

    for (const item of cart.value) {
        discountApplied.value++;

        if (item.promoApplied) {
            continue;
        }

        await $api.post('/users/cart/discount', {
            productId: item.id,
            quantity: item.quantity,
        });

        await new Promise((resolve) => setTimeout(resolve, 850));
    }
    await fetchCartItems();

    cart.value = cart.value.reverse();
    underDiscountApplication.value = false;
};

const fetchCartItems = async () => {
    isLoading.value = true;

    await $api
        .get('/users/cart')
        .then((response) => {
            cart.value = response;
        })
        .catch((error) => {
            console.error('Error fetching cart items:', error);
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
        fetchCartItems();
    }
};

onMounted(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        useRouter().push('/login');
    }

    try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now() || decoded.mfa) {
            useRouter().push('/login');
        } else {
            fetchCartItems();
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }
    } catch {
        localStorage.removeItem('token');
        useRouter().push('/login');
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped>
.bottom-safe-area {
    padding-bottom: env(safe-area-inset-bottom, 2.5rem); /* Pour le bouton */
}
.pb-bottom-safe-area {
    padding-bottom: calc(8rem + env(safe-area-inset-bottom, 2.5rem));
}
</style>
