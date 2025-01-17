const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Conexión a MongoDB
const fullURI =
  "mongodb+srv://chunche95:5pGcOFYhRt0BBk45@cluster0.jq2rb.mongodb.net/iotDB";

mongoose
  .connect(fullURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB DataBase connection successful"))
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  });

// Importar rutas
const indexRouter = require("./routes/index");
const devicesRouter = require("./routes/devices");
const recordsRouter = require("./routes/records");
const recordRouter = require("./routes/record");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const sessionsRouter = require("./routes/sessions");

// Rutas
app.use("/", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/devices", devicesRouter);
app.use("/records", recordsRouter);
app.use("/record", recordRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/sessions", sessionsRouter);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware de manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

module.exports = app;
