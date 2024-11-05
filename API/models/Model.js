var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
  name: String,
  location: String,
  protocol: String,
  ipAddress: String,
  model: String,
  macAddress: String,
  firmwareVersion: String,
  lastConnection: Date,
  isActive: Boolean,
  resolution: String,
  streamUrl: String,
  isRecording: Boolean,
  configuration: Object,
  alertRule: Object
});
module.exports = mongoose.model("Model", ModelSchema);