var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AuditShema = new Schema({
    user: {type: String, required: true},
    date: {type: Date, default: Date.now},
    action: {type: String, required: true}
});
module.exports = mongoose.model("Audit", AuditShema);