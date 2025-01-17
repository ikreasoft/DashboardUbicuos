var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Record = require("../models/Record.js");
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;

router.get("/:id", function (req, res) {
    Record.findById(req.params.id).then(function (record) {
        res.status(200).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/", function (req, res) {
    Record.create(req.body).then(function (record) {
        res.status(201).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.put("/:id", function (req, res) {
    Record.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (record) {
        res.status(200).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.delete("/:id", function (req, res) {
    Record.findByIdAndDelete(req.params.id).then(function (record) {
        res.status(200).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

module.exports = router;