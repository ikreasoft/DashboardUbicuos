var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Permision = require("../models/Permission.js");
mongoose.set("strictQuery", false);
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;
router.put("/:id", verificarToken, function(req, res) {
    Permision.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, permision) {
        if (err) res.status(500).send(err);
        res.status(200).send(permision);
    });
});
router.post("/", verificarToken, function(req, res) {
    var permision = new Permision(req.body);
    permision.save(function(err) {
        if (err) res.status(500).send(err);
        res.status(201).send(permision);
    });
});
module.exports = router;