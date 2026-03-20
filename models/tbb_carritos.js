'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_carritos.init({
    fecha_creacion: DataTypes.STRING,
    total: DataTypes.STRING,
    id_usuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  return tbb_carritos;
};