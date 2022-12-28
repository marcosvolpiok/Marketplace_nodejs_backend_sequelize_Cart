const bcrypt = require('bcrypt');
const { createClient } = require("redis");
const loginHelper = require('../helpers/loginHelper');
const { cacheHelper } = require('../helpers/cacheHelper');
const cacheHelperOb = new cacheHelper(createClient);

const cartRepository = require('../repository/cartRepository');
const cartProductRepository = require('../repository/cartProductRepository');

const cartService = require('../services/cartService');
const cartProductService = require('../services/cartProductService');

const {Shop, Product, Image, Cart, CartProduct, Sequelize, sequelize} = require('../models');

const cartRepositoryOb=new cartRepository(Cart, Shop, Sequelize, sequelize, cacheHelperOb);
const cartServiceOb = new cartService(cartRepositoryOb);

const cartProductRepositoryOb=new cartProductRepository(CartProduct, Cart, Shop, Product, Sequelize, sequelize, cacheHelperOb);
const cartProductServiceOb = new cartProductService(cartProductRepositoryOb);

module.exports = {
    Sequelize, sequelize, 
    cartServiceOb, cartProductServiceOb,
};