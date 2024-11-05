var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Record = require("../models/Record.js");
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;

router.get("/record/:id", function (req, res) {
    Record.findById(req.params.id).then(function (record) {
        if (record) {
            console.log("Record found:", record);
        } else {
            console.log("No record found.");
        }
        res.status(200).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

module.exports = router;