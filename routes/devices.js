var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Camera = require("../models/Camera.js");
var db = mongoose.connection;

/* This code snippet defines a route in an Express router that handles GET requests to "/cameras". When
a GET request is made to this route, it will log "GET /cameras" to the console, then attempt to find
all Camera documents in the database using `Camera.find()`. */
router.get("/cameras", function (req, res) {
    console.log("GET /cameras");
    Camera.find().then(function (cameras) {
        console.log(cameras[0]);
        // if (cameras) {
        //     debug("Cameras found:", cameras);
        // } else {
        //     debug("No camera found.");
        // }
        res.status(200).json(cameras)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
/* This code snippet defines a route in an Express router that handles GET requests to "/cameras/:id".
When a GET request is made to this route with a specific camera ID parameter, it will log "GET
/cameras/:id" to the console. */
router.get("/cameras/:id", function (req, res) {
    Camera.findById(req.params.id).then(function (camera) {
        if (camera) {
            debug("Cameras found:", camera);
        } else {
            debug("No camera found.");
        }
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
/* This code snippet defines a route in an Express router that handles POST requests to "/cameras".
When a POST request is made to this route, it creates a new instance of the Camera model using the
data from the request body (`req.body`). It then saves this new Camera instance to the database
using `camera.save()`. */
router.post("/cameras", function (req, res) {
    var camera = new Camera(req.body);
    camera.save().then(function (camera) {
        res.status(201).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});


module.exports = router;