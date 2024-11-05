var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Record = require("../models/Roles.js");
var db = mongoose.connection;

router.get("/roles/:id", function (req, res) {
    Record.findById(req.params.id).then(function (record) {
        if (record) {
            console.log("Rol found:", record);
        } else {
            console.log("Rol not found.");
        }
        res.status(200).json(record)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

module.exports = router;ee