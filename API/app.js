const express = require('express')
var mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express()
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const fullURI = process.env.MONGODB_URI || "mongodb://mongo:27017/labdb";
console.log(process.env.MONGODB_URI); 
mongoose
  .connect(fullURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB DataBase connection successful"));

var devicesRouter = require("./routes/devices");
var indexRouter = require("./routes/index");
var permissionsRouter = require("./routes/permissions");
var recordsRouter = require("./routes/records");
var recordRouter = require("./routes/record");
var rolesRouter = require("./routes/roles");
var sessionsRouter = require("./routes/sessions");
var usersRouter = require("./routes/users");
const { exit } = require('process');
app.use("/", indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/devices", devicesRouter);
app.use("/permissions", permissionsRouter);
app.use("/records", recordsRouter);
app.use("/record", recordRouter);
app.use("/roles", rolesRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//     console.log(`http://localhost:${port}`)
//   })

  
module.exports = app;