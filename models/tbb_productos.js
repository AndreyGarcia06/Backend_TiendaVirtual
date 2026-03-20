'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_productos.init({
    nombre: DataTypes.STRING,
    description: DataTypes.STRING,
    precio: DataTypes.STRING,
    stock: DataTypes.STRING,
    id_categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });
  return tbb_productos;
};