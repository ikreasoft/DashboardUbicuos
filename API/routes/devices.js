var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Camera = require("../models/Camera.js");
var Model = require("../models/Model.js");
var Sensor = require("../models/Sensor.js");
mongoose.set("strictQuery", false);
var { verificarToken } = require("../auxiliar/seguridad.js");
var db = mongoose.connection;
router.get("/", function (req, res) {
    const tipo = req.query.type;
    var filtro = req.query;
    if (tipo == undefined || tipo == 'Camera')
        // Returns all devices Camera and Sensor
        Camera.find(filtro).then(function (cameras) {
            res.status(200).json(cameras)
        }).catch(function (err) {
            res.status(500).send(err)
        });
    else
        Sensor.find({ type: tipo }).then(function (sensores) {
            res.status(200).json(sensores)
        }).catch(function (err) {
            res.status(500).send(err)
        });
});

// #region cameras
router.get("/camera/:id", function (req, res) {
    Camera.findById(req.params.id).then(function (camera) {
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.post("/camera", function (req, res) {
    Camera.create(req.body).then(function (camera) {
        res.status(200).json(camera)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

router.put("/camera/:id", function (req, res) {
    Camera.findByIdAndUpdate(req.params.id, req.body).then(function (err, camera) {
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

// #region sensors
router.post("/sensor", function (req, res) {
    Sensor.create(req.body).then(function (sensor) {
        res.status(200).json(sensor)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.put("/sensor/:id", function (req, res) {
    Sensor.findByIdAndUpdate(req.params.id, req.body).then(function (sensor) {
        res.status(200).json(sensor)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.delete("/sensor/:id", function (req, res) {
    Sensor.findByIdAndDelete(req.params.id).then(function (sensor) {
        res.status(200).json(sensor)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
// #endregion
module.exports = router;