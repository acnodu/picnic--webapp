import CartsSchema from '../models/carts';

class Carts {
    constructor({ _id } = {}) {
        this.userId = _id;
    }

    async create(cart) {
        const totalWithoutDiscount = cart.reduce((total, item) => {
            return total + item.price;
        }, 0);

        const totalWithDiscount = cart.reduce((total, item) => {
            return total + item.newPrice;
        }, 0);

        const totalDiscount = totalWithoutDiscount - totalWithDiscount;

        const newCart = new CartsSchema({
            userId: this.userId,
            items: cart,
            totalWithoutDiscount,
            totalWithDiscount,
            totalDiscount,
        });

        console.log('ça save ?');

        const savedCart = await newCart.save();

        if (!savedCart) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to save cart',
            });
        }
        return savedCart;
    }
}

export default Carts;
