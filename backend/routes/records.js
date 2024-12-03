var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Record = require("../models/Record.js");
mongoose.set("strictQuery", false);
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;

router.get("/:cameraId", function (req, res) {
    Record.find({ camera: req.params.cameraId }).populate('camera').then(function (recordings) {
        res.status(200).json(recordings)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
module.exports = router;