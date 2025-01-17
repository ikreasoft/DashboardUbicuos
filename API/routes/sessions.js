var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Session = require("../models/Session.js");
var SensorData = require("../models/SensorData.js");
mongoose.set("strictQuery", false);
var { verificarToken } = require("../auxiliar/seguridad.js");

var db = mongoose.connection;

// #region sessions
// This request handler retrieves all Session documents from the database that have a `startSession` date
// greater than or equal to the `start` query parameter and less than the `end` query parameter. It then
// populates the `user` and `devices` fields of each Session document with their corresponding documents
// from the User and Sensor collections, respectively. The resulting array of populated Session documents
// is then sent as a JSON response with a status code of 200.
// Sample request
// http://localhost:3000/sessions?start=2024-08-05&end=2025-01-01
router.get("/", function (req, res) {
    const start = req.query.start==undefined?new Date(0):req.query.start;
    const end = req.query.end==undefined?new Date(3000,0,12):req.query.end;
    const startDate = new Date(start);
    const endDate = new Date(end);
    console.log(startDate);
    console.log(endDate);
    console.log("GET /sesiones");
    Session.find({startSession:{$gte:startDate, $lte: endDate}}).populate('user').populate('devices').then(function (sesiones) {
        res.status(200).json(sesiones)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.get("/session/:id", function (req, res) {
    Session.findById(req.params.id).then(function (session) {
        res.status(200).json(session)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/session", function (req, res) {
    Session.create(req.body).then(function (session) {
        res.status(200).json(session)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.put("/session/:id", function (req, res) {
    Session.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (session) {
        res.status(200).json(session)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.delete("/session/:id", function (req, res) {
    Session.findByIdAndDelete(req.params.id).then(function (session) {
        res.status(200).json(session)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});

// #endregion
// #region data
router.get("/data/:sesion", function (req, res) {
    const pagina = req.query.page==undefined?0:req.query.page -1;
    const tamaño = req.query.size==undefined?1000:req.query.size;
    const sesion = req.params.sesion;
    SensorData.find({ session: sesion }).limit(tamaño).skip(pagina*tamaño).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/data", function (req, res) {
    SensorData.create(req.body).then(function (data) {
        res.status(200).send(data)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.post("/dataSecure", verificarToken, function (req, res) {
    SensorData.create(req.body).then(function (data) {
        res.status(200).send(data)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.delete("/data/session/:sesion", function (req, res) {
    SensorData.deleteMany({ session: req.params.sesion }).then(function (data) {
        res.status(200).json(data)
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
router.delete("/data/single/:id", function (req, res) {
    SensorData.findByIdAndDelete(req.params.id).then(function (data) {
        res.status(200).send("OK")
    }).catch(function (err) {
        res.status(500).send(err)
    });
});
// #endregion
module.exports = router;