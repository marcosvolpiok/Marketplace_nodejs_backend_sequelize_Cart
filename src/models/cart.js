'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Cart.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    id_shop: {type: DataTypes.INTEGER, allowNull: false,},
    id_customer: {type: DataTypes.INTEGER, allowNull: false,},
    state: {type: DataTypes.SMALLINT, allowNull: true},
    updated_at: {type: DataTypes.STRING, allowNull: true},
    created_at: {type: DataTypes.DATE, allowNull: true},
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false,
    autoQueryFallback: true
  });
  return Cart;
};