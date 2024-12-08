require('dotenv').config();


module.exports = {
    development: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // Exigir SSL para Neon
          rejectUnauthorized: false, // Aceitar certificados auto-assinados
        },
      },
    },
    test: {
      url: process.env.DATABASE_URL, // Você pode definir outro banco para testes
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
    production: {
      url: process.env.DATABASE_URL, // Usará a URL definida no ambiente de produção
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
  