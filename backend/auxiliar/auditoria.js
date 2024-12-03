var Audit = require("../models/Audit.js");
// @param username: el usuairo que realiza la acción
// @param action: la acción realizada
function auditar (username, action){
    var auditoria = new Audit({})
    var fecha = new Date();
    fecha.setHours(fecha.getHours() + 1);
    auditoria.user = username;
    auditoria.date = fecha;
    auditoria.action = action;
    auditoria.save();
}
module.exports = { auditar };