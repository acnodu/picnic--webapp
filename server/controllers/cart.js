import PicnicService from '../services/picnic.js';

const getCart = async (event) => {
    const Picnic = new PicnicService(event.context.session);
    const cart = await Picnic.getCart();

    return formateCartItems(cart);
};

const discountItem = async (event) => {
    const { productId, quantity } = await readBody(event);

    const Picnic = new PicnicService(event.context.session);
    await Picnic.removeFromCart(productId, quantity);

    const newCart = await Picnic.addToCart(productId, quantity, true);

    return formateCartItems(newCart);
};

const formateCartItems = (cart) => {
    return cart.map((item) => {
        return {
            id: item.items[0].id,
            name: item.items[0].name,
            quantity:
                item.items[0].decorators.find((decorator) => decorator.type === 'QUANTITY')
                    ?.quantity || 1,
            unitQuantity:
                item.items[0].decorators.find((decorator) => decorator.type === 'UNIT_QUANTITY')
                    ?.unit_quantity_text || item.items[0].unit_quantity,
            price: item.display_price,
            image: `https://storefront-prod.fr.picnicinternational.com/static/images/${item.items[0].image_ids[0]}/padded-500x500.webp`,
            promoApplied: !!item.decorators?.find(
                (decorator) =>
                    decorator.type === 'PROMO' &&
                    decorator.text &&
                    decorator.text.includes('10% autre choix')
            ),
            newPrice:
                item.decorators?.find((decorator) => decorator.type === 'PRICE')?.display_price ??
                item.items[0].price *
                    (item.items[0].decorators.find((decorator) => decorator.type === 'QUANTITY')
                        ?.quantity || 1),
        };
    });
};

export { getCart, discountItem };
