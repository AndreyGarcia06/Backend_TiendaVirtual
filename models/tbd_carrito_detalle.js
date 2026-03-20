'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbd_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbd_carrito_detalle.init({
    id_carrito: DataTypes.STRING,
    precio_unitario: DataTypes.STRING,
    cantidad: DataTypes.STRING,
    id_producto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbd_carrito_detalle',
  });
  return tbd_carrito_detalle;
};