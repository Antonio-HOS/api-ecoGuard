const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const sequelize = require("../config/database"); // Ajuste o caminho relativo para o correto

const aguasRoutes = require("../routes/aguas"); // Ajuste o caminho relativo para o correto
const solosRoute = require("../routes/solos");
const aresRoutes = require("../routes/ares");
const denunciaRoutes = require("../routes/denuncia");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Sincronização do banco de dados
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

// Exportação da função serverless
module.exports.handler = serverless(app);
