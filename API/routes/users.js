var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var User = require("../models/User.js");
var Role = require("../models/Role.js");
var db = mongoose.connection;
// Only for admin users
router.get("/", function (req, res) {
    console.log("GET /users");
    User.find().then(function (users) {
        res.status(200).json(users)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.get("/:id", function (req, res) {
    User.findById(req.params.id).then(function (user) {
        res.status(200).json(user)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.get("/roles", function (req, res) {
    Role.find().then(function (roles) {
        res.status(200).json(roles)
    }).catch(function (err) {
        res.status(500).send(err)
    }
    );
});

module.exports = router;