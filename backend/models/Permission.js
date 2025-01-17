var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PermisionSchema = new Schema({
    module: String,
    //True = you are allowed to preform this action, 
    //False = you are not allowed to preform this action
    action: { 
        read: { Boolean, default: false }, 
        use: { Boolean, default: false }, 
        modify: { Boolean, default: false } 
    }
});
module.exports = mongoose.model("Permission", PermisionSchema);