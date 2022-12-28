const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class cartProductRepository extends Interface(baseRepository) {
    constructor(CartProduct, Cart, Shop, Product, Sequelize, sequelize, cacheClient) {
        super();
        this.CartProduct=CartProduct;
        this.Cart=Cart;
        this.Shop=Shop;
        this.Product=Product;
        this.Sequelize=Sequelize;
        this.sequelize=sequelize;
        this.Op = this.Sequelize.Op;
        this.cacheClient = cacheClient;
        
    }

    async listById (idCart) {
        const cart = await this.CartProduct.findAll({ attributes: ['id', 'id_cart', 'id_product', 'quantity'],
        where: {
            id_cart: idCart 
        },
     });

     return cart;
    }
    

    async list (req) {
    }

    async add (params) {
        let cartId;

        //Searches if exists cart active with this user
        const cart = await this.Cart.findOne({ attributes: ['id'],
        where: {
            id_customer: params.idCustomer,
            id_shop: params.idShop,
            state: 0
        }
        });

        //Check if cart exists
        if (cart) {
            cartId = cart.id;
        } else {
            const cartNew = await this.Cart.create({
                id_shop: params.idShop,
                id_customer: params.idCustomer,
                quantity: params.quantity
            });

            cartId = cartNew.id;
        }

        //Check if cartProduct exits
        const cartProduct = await this.CartProduct.findOne({
            where: {
                id_cart: cartId,
                id_product: params.idProduct
            }
        });

        if(cartProduct){
            return {
                state: 'OBJECT_EXISTS',
                message: 'The product exists in the cart',
                detail: {
                    id: cartProduct.id,
                    id_cart: cartId
                }
            };
        } else {
            //Searches product
            const product = await this.Product.findByPk(params.idProduct);
            const cartProductNew = await this.CartProduct.create({
                id_cart: cartId,
                id_product: params.idProduct,
                quantity: params.quantity,
                price: product.price
            });

            return cartProductNew;
        }
    }

    async update (params) {
        const cartProduct = await this.CartProduct.findOne(
        {
            include: [
                {
                    model: this.Cart,
                    as: 'cart', attributes: [],
                    where: {
                        'id_customer': params.res.userData.idCustomer
                    }
                }
            ],
            where: {
                'id_cart': params.id,
            }
        });
        
        if(cartProduct){
            if(params.quantity == 0){
                const destroy = await cartProduct.destroy();

                return destroy;
            }else{
                cartProduct.quantity = params.quantity;
                const update = await cartProduct.save();

                return update;
            }
        }else{
            return {status: 'CART_NOT_FOUND', message: 'No se encontró el carrito'};
        }
    }

    async delete (params) {
        const cartProduct = await this.CartProduct.findOne({ attributes: ['id'],
            where: {
                id_cart: params.idCart,
                id_product: params.idProduct,
            },
            include: [
                {
                    model: this.Cart,
                    as: 'cart', attributes: [],
                    where: {
                        'id_customer': params.res.userData.idCustomer
                    }
                }
            ],
        });

        if(cartProduct){
            const cartProductDestroy = await cartProduct.destroy();

            return cartProductDestroy;
        } else {
            return {state: 'OBJECT_NO_FOUND', message: 'Object doesnt found'};
        }
    }

    async getTotalAmountCart (id) {
        await this.sequelize.query(
            `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
            { raw: true }
        );

        const cart = await this.CartProduct.findAll({
            attributes: [
              'id_cart',
              [this.Sequelize.literal('( SUM(product.price * CartProduct.quantity) )'), 'totalAmount']
            ],
            group: ['id_cart'],
            where: {
                id_cart: id
            },
          });

        return cart;
    }
}

module.exports = cartProductRepository;