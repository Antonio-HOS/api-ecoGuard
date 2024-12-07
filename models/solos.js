const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Solos = sequelize.define("Solos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  regiao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dado: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Solos;