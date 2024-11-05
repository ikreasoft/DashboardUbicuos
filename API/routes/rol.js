var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Role = require("../models/Role.js");
var db = mongoose.connection;

router.get("/:id", function (req, res) {
    Role.findById(req.params.id).then(function (role) {
        if (role) {
            console.log("Rol found:", role);
        } else {
            console.log("Rol not found.");
        }
        res.status(200).json(role)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

module.exports = router;