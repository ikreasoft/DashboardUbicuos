var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RolesSchema = new Schema({
    roleName: String
});
module.exports = mongoose.model("Roles", RolesSchema);