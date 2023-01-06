const router = require('express').Router();
const Joi = require('joi');
const moment = require('moment');
const {
    cartControllerOb,
    cartProductControllerOb,
} = require('../dependencies/');

router.get('/cart/', cartControllerOb.list);
router.get('/cart/user/', cartControllerOb.listByIdUser);
router.get('/cart/shop/:idShop/state/:state', cartControllerOb.listByIdUserAndIdShop);

router.get('/cart/:idCart', cartProductControllerOb.listById);
router.put('/cart/', cartProductControllerOb.add);
router.delete('/cart/product/', cartProductControllerOb.delete);
router.patch('/cart/product/', cartProductControllerOb.update);

router.post('/cart/order/:idCart', cartProductControllerOb.createOrderFromCart);

module.exports = router;