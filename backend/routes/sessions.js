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
    const start = req.query.start;
    const end = req.query.end;
    const startDate = new Date(start);
    const endDate = new Date(end);
    console.log("GET /sesiones");
    Session.find().populate('user').populate('devices').then(function (sesiones) {
        console.log(sesiones);
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
router.put("/model/:id", function (req, res) {
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
    const sesion = req.params.sesion;
    console.log("Session ID recibido en el backend:", sesion); // Log para verificar el sessionId
  
    const pagina = req.query.pagina ? req.query.pagina - 1 : 0; // Por defecto, página 0
    const tamaño = 1000;
  
    // Validar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(sesion)) {
      return res.status(400).json({ error: "ID de sesión inválido" });
    }
  
    SensorData.find({ session: sesion })
      .limit(tamaño)
      .skip(pagina * tamaño)
      .then(function (data) {
        res.status(200).json(data);
      })
      .catch(function (err) {
        console.error("Error en el backend:", err); // Log del error en el servidor
        res.status(500).send(err);
      });
  });
  
// #endregion
module.exports = router;