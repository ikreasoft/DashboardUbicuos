var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RecordingSchema = new Schema({
    fileName: String,
    device: { type: Schema.Types.ObjectId, ref: "Camera" },
    format: String,
    duration: Number,
    fileSize: Number,
    fileUrl: String,
    startTime: Date,
    endTime: Date
}); 
module.exports = mongoose.model("Record", RecordingSchema);