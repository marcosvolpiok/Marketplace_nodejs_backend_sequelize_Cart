const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class cartRepository extends Interface(baseRepository) {
    constructor(Cart, Shop, Sequelize, sequelize, cacheClient) {
        super();
        this.Cart=Cart;
        this.Shop=Shop;
        this.Sequelize=Sequelize;
        this.sequelize=sequelize;
        this.Op = this.Sequelize.Op;
        this.cacheClient = cacheClient;
    }

    async list (req) {
        console.log('***List from cartRepository *****');

        const cache = await this.cacheClient.getCache(req.url);
        if(cache){
            console.log('It has caché')
            return JSON.parse(cache);
        }

        console.log('it has not cache')

        //const cart = await this.Cart.findAll({ attributes: ['id']  });
        const cart = await this.Cart.findAll();
        this.cacheClient.setCache(req.url, JSON.stringify(cart));
         
        return cart;
    }

    async listByIdUser (res) {
        const cart = await this.Cart.findOne({ attributes: ['id', 'id_shop'],
            where: {
                id_customer: res.userData.idCustomer 
            },
        });

        return cart;
    }

    async listByIdUserAndIdShop (idShop, state, res) {
        const cart = await this.Cart.findOne({ attributes: ['id', 'id_shop'],
        where: {
            id_customer: res.userData.idCustomer,
            id_shop: idShop,
            state: state
        },
        });

        return cart;
    }

    async listById (id) {
        const cart = await this.Cart.findByPk(id);

        return cart;
    }

    async add (params) {
    }

    async update (params) {
        const cart = await this.Cart.findByPk(params.id);
        cart.state = params.state;
        await cart.save(); 
    }

    delete (params) {
    }
}

module.exports = cartRepository;