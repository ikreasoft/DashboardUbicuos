var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var SessionSchema = new Schema({
    subject: String,
    startSession: { type: Date, default: Date.now },
    endSession: Date,
    devices: [{ type: Schema.Types.ObjectId, ref: "Sensor" }],
    user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Session", SessionSchema);