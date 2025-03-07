var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CameraSchema = new Schema({
  name: String,
  type: String,
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
  // configuration: Object,
  // alertRule: Object
});
module.exports = mongoose.model("Camera", CameraSchema, this.collection="devices");