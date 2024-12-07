const serverless = require('serverless-http');
const express = require('express');
const app = express();
const aguasRoutes = require("./routes/aguas"); // Ajuste o caminho relativo para o correto
const solosRoutes = require("./routes/solos");
const aresRoutes = require("./routes/ares");
const denunciaRoutes = require("./routes/denuncia");

// Middlewares e rotas do Express
app.use('/aguas', aguasRoutes); // Usa rotas definidas no arquivo "./routes/aguas"
app.use('/solos', solosRoutes); // Usa rotas definidas no arquivo "./routes/solos"
app.use('/ares', aresRoutes); // Usa rotas definidas no arquivo "./routes/ares"
app.use('/denuncia', denunciaRoutes); 


  // Exporta a função serverless
  module.exports.api = serverless(app);
// Exporta a função Express para o Serverless
module.exports.api = serverless(app);
