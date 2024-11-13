var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
mongoose.set("strictQuery", false);
require("../models/Permision.js");

var Role = require("../models/Role.js");
var db = mongoose.connection;

router.get("/", function (req, res) {
    Role.find().then(function (roles) {
        res.status(200).json(roles)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});


router.get("/:id", function (req, res) {
    Role.findById(req.params.id).populate('permisions').then(function (role) {
        console.log(role);
        res.status(200).json(role)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/", function (req, res) {
    Role.create(req.body).then(function (role) {
        res.status(200).json(role)
    }).catch(function (err) {
        res.status(500).send(err)
    });

});



module.exports = router;