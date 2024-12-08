const serverless = require('serverless-http');
const express = require('express');
const app = express();
const aguasRoutes = require("../routes/aguas"); // Ajuste o caminho
const solosRoutes = require("../routes/solos");
const aresRoutes = require("../routes/ares");
const denunciaRoutes = require("../routes/denuncia");
const sequelize = require("../config/database"); // Ajuste o caminho

//// Sincronização do banco de dados
sequelize
.sync()
.then(() => console.log("Database connection established"))
.catch((err) => console.error("Unable to connect to the database:", err));

// Middlewares e rotas
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/aguas', aguasRoutes);
app.use('/solos', solosRoutes);
app.use('/ares', aresRoutes);
app.use('/denuncia', denunciaRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});