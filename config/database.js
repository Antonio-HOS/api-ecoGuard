require('dotenv').config();  
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Exigir SSL para Neon
      rejectUnauthorized: false, // Aceitar certificados auto-assinados
    },
  },
});

module.exports = sequelize;

