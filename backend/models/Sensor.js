var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SensorShema = new Schema({
    name: String,
    type: String,
    location: String,
    ipAddress: String,
    macAddress: String,
    model: String,
    firmwareVersion: String,
    lastConnection: Date,
    isActive: Boolean
});
module.exports = mongoose.model("Sensor", SensorShema, this.collection="devices");