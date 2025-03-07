const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SensorDataSchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: "Sensor" },
    session: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    location: { type: String, required: true },
    value: { type: Number, required: true },
    measureUnit: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
