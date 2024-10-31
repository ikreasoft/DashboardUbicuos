const express = require('express')
var mongoose = require("mongoose");
const app = express()
const port = 3000

const fullURI = process.env.MONGODB_URI || "mongodb://localhost:27017/labdb";
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
app.use("/", indexRouter);
app.use("/devices", devicesRouter);
app.use("/records", recordsRouter);
app.use("/record", recordRouter);
app.use("/users", usersRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
  })

  
module.exports = app;