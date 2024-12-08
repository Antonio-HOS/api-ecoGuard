require('dotenv').config();  
const { Sequelize } = require('sequelize');
import pg from 'pg';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Exigir SSL para Neon
      rejectUnauthorized: false, // Aceitar certificados auto-assinados
    },
    dialectModule: pg
  },
});

module.exports = sequelize;

