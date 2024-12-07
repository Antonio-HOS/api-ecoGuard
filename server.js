const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const aguasRoutes = require("./routes/aguas")
const solosRoute = require("./routes/solos")
const aresRoutes = require("./routes/ares")
const denunciaRoutes = require("./routes/denuncia")
// const userRoutes = require("./routes/user")

require("dotenv").config();


const app = express();
app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });


// app.use("/user", userRoutes);
app.use("/aguas", aguasRoutes);
app.use("/solos", solosRoute);
app.use("/ares", aresRoutes);
app.use("/denuncia", denunciaRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
