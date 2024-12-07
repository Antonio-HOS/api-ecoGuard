const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const sequelize = require("../config/database");

const aguasRoutes = require("../routes/aguas");
const solosRoute = require("../routes/solos");
const aresRoutes = require("../routes/ares");
const denunciaRoutes = require("../routes/denuncia");

// Não é mais necessário fazer dotenv.config aqui, pois o Vercel já trata variáveis de ambiente automaticamente.
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Sincronizando o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

// Rotas da aplicação
app.use("/aguas", aguasRoutes);
app.use("/solos", solosRoute);
app.use("/ares", aresRoutes);
app.use("/denuncia", denunciaRoutes);

// Exportando a função serverless
module.exports.handler = serverless(app);
