var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SensorDataSchema = new Schema({
  device: { type: Schema.Types.ObjectId, ref: "Sensor" },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
  location: String,
  value: Number,
  measureUnit: String,
  timestamp: Date
});
module.exports = mongoose.model("SensorData", SensorDataSchema);