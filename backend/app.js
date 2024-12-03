const express = require('express')
var mongoose = require("mongoose");
const app = express()
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const fullURI = "mongodb+srv://chunche95:5pGcOFYhRt0BBk45@cluster0.jq2rb.mongodb.net/iotDB" || "mongodb://localhost:27017/labdb";
mongoose
  .connect(fullURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB DataBase connection successful"));

var indexRouter = require("./routes/index");
var devicesRouter = require("./routes/devices");
var recordsRouter = require("./routes/records");
var recordRouter = require("./routes/record");
var usersRouter = require("./routes/users");
var rolesRouter = require("./routes/roles");
var sessionsRouter = require("./routes/sessions");
app.use("/", indexRouter);

app.use("/devices", devicesRouter);
app.use("/records", recordsRouter);
app.use("/record", recordRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/sessions", sessionsRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//     console.log(`http://localhost:${port}`)
//   })

  
module.exports = app;