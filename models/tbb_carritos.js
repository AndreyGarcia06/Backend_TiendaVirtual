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
    fecha_creacion: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    total: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  return tbb_carritos;
};