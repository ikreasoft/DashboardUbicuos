var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Camera = require("../models/Camera.js");
var Model = require("../models/Model.js");
mongoose.set("strictQuery", false);
var { verificarToken } = require("../auxiliar/seguridad.js");

var db = mongoose.connection;

// #region camaras
/* This code snippet defines a route in an Express router that handles GET requests to "/cameras". When
a GET request is made to this route, it will log "GET /cameras" to the console, then attempt to find
all Camera documents in the database using `Camera.find()`. */
router.get("/cameras", function (req, res) {
    console.log("GET /cameras");
    Camera.find().then(function (cameras) {
        res.status(200).json(cameras)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

/* This code snippet defines a route in an Express router that handles GET requests to "/cameras/:id".
When a GET request is made to this route with a specific camera ID parameter, it will log "GET
/cameras/:id" to the console. */
router.get("/camera/:id", function (req, res) {
    Camera.findById(req.params.id).then(function (camera) {
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

/* This code snippet defines a route in an Express router that handles POST requests to "/cameras".
When a POST request is made to this route, it creates a new instance of the Camera model using the
data from the request body (`req.body`). It then saves this new Camera instance to the database
using `camera.save()`. */
router.post("/camera", function (req, res) {
    console.log(req.body);
    Camera.create(req.body).then(function (camera) {
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.put("/camera/:id", function (req, res) {
    console.log("PUT /camera/:id");
    console.log(req.params.id);
    console.log("cuerpo")
    console.log(req.body);
    Camera.findByIdAndUpdate(req.params.id, req.body).then( function (err, camera) {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json(camera)
    });
});

router.delete("/camera/:id", function (req, res) {
    Camera.findByIdAndDelete(req.params.id).then(function (camera) {
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

// #endregion
// #region modelos
router.get("/models", function (req, res) {
    Model.find().then(function (models) {
        res.status(200).json(models)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.get("/model/:id", function (req, res) {
    Model.findById(req.params.id).then(function (model) {
        res.status(200).json(model)
    }
    ).catch(function (err) {
        res.status(500).send(err)
    }
    );
});

router.post("/model", function (req, res) {
    var model = new Model(req.body);
    model.save().then(function (model) {
        res.status(201).json(model)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.put("/model/:id", function (req, res) {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (model) {
        res.status(200).json(model)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.delete("/model/:id", function (req, res) {
    Model.findByIdAndDelete(req.params.id).then(function (model) {
        res.status(200).json(model)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
// #endregion

module.exports = router;