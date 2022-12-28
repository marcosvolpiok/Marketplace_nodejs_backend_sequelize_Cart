'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartProduct.hasMany(models.Cart, {
        foreignKey: 'id',
        sourceKey: 'id_cart',
        as: 'cart'
      });
    }
  };
  CartProduct.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    id_cart: {type: DataTypes.INTEGER, allowNull: false,},
    id_product: {type: DataTypes.INTEGER, allowNull: false,},
    quantity: {type: DataTypes.SMALLINT, allowNull: false,},
    updated_at: {type: DataTypes.STRING, allowNull: true},
    created_at: {type: DataTypes.DATE, allowNull: true}
  }, {
    sequelize,
    modelName: 'CartProduct',
    timestamps: false,
    autoQueryFallback: true
  });
  return CartProduct;
};