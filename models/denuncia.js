const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Denuncias = sequelize.define("Denuncias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Denuncias", // Nome da tabela no banco de dados
});


module.exports = Denuncias;