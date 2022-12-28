const req = require('express/lib/request');
const {
  shopServiceOb,
  productServiceOb,
  customerServiceOb,
  cartServiceOb,
  cartProductServiceOb,
  orderServiceOb
} = require('../dependencies/');

const resolvers = {
  Query: {
    async getCart() {
      const req = {};
      req.url = 'getCart';
      return await cartServiceOb.list(req);
    },

    async getCartByUser(root, args, context) {
      const res = context.res
      return await cartServiceOb.listByIdUser(res);
    },

    async getCartByUserAndShop(root, args, context) {
      const req = context.req;
      req.params.idShop = args.idShop;
      req.params.state = args.state;
      const res = context.res;
      return await cartServiceOb.listByIdUserAndIdShop(req, res);
    },

    async getCartById(root, args, context) {
      const req = context.req;
      req.params.idCart = args.idCart;
      const res = context.res;

      return await cartProductServiceOb.listById(req, res);
    },
  },

  Mutation: {
    async addCart(_, { input }, context) {
      const res = context.res;
      const req = {body: input};

      return await cartProductServiceOb.add(req, res);
    },

    async updateCart(_, { input }, context) {
      const res = context.res;
      const req = {body: input};

      return await cartProductServiceOb.update(req, res);
    },

    async createOrderFromCart(_, { input }, context) {
      const res = context.res;
      const req = {body: input};

      return await orderServiceOb.addFromCart(req, res);
    },    
  }   
}

module.exports = resolvers