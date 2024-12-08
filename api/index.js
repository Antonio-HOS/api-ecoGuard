const express = require("express");
const app = express();
const aguasRoutes = require("../routes/aguas"); // Ajuste o caminho
const solosRoutes = require("../routes/solos");
const aresRoutes = require("../routes/ares");
const denunciaRoutes = require("../routes/denuncia");
const sequelize = require("../config/database"); // Ajuste o caminho
const cors = require("cors");

//// Sincronização do banco de dados
app.use(
  cors({
    origin: "https://ecoguard-three.vercel.app", // Permite requisições apenas de localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Permite métodos específicos
    allowedHeaders: ["Content-Type", "Authorization"], // Permite cabeçalhos específicos
  })
);

sequelize
  .sync()
  .then(() => console.log("Database connection established"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Middlewares e rotas
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/aguas", aguasRoutes);
app.use("/solos", solosRoutes);
app.use("/ares", aresRoutes);
app.use("/denuncia", denunciaRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
