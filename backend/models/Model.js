var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
  name: String,
  location: String,
  protocol: String,
  firmwareVersion: String,
  resolution: String,
  streamUrl: String
  // isRecording: Boolean,
  // configuration: Object,
  // alertRule: Object
});
module.exports = mongoose.model("Model", ModelSchema);