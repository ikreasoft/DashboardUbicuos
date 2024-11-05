var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Record = require("../models/Record.js");
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;

router.get("/:cameraId", function (req, res) {
    console.log("GET /recordings/:cameraId");
    Record.find({ cameraId: req.params.cameraId }).then(function (recordings) {
        console.log(recordings[0]);
        res.status(200).json(recordings)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
module.exports = router;