const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    subject: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    devices: [{ type: Schema.Types.ObjectId, ref: "Sensor" }],
    startSession: { type: Date },
    endSession: { type: Date }
});

module.exports = mongoose.model("Session", SessionSchema);
