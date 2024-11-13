var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RoleSchema = new Schema({
    name: String,
    permisions: [{type: Schema.Types.ObjectId, ref: "Permision"}]
});
module.exports = mongoose.model("Role", RoleSchema);