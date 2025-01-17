var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SensorDataSchema = new Schema({
  device: { type: Schema.Types.ObjectId, ref: "Sensor" },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
  location: String,
  value: {type: Number, required: true},
  measureUnit: {type: String, required: true},
  timestamp: Date
});
module.exports = mongoose.model("SensorData", SensorDataSchema);