var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AuditShema = new Schema({
    user: String,
    date: Date,
    action: String
});
module.exports = mongoose.model("Audit", AuditShema);