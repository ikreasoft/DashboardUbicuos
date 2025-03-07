var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Camera = require("../models/Camera.js");
var Model = require("../models/Model.js");
var Sensor = require("../models/Sensor.js");

mongoose.set("strictQuery", false);

// Middleware para manejar errores generales
function manejarErrores(res, err, customMessage = null) {
    console.error("Error:", err);
    res.status(500).json({ error: customMessage || err.message });
}

// Ruta principal para obtener dispositivos
router.get("/", async (req, res) => {
    const tipo = req.query.type;
    try {
        if (!tipo || tipo === "Camera") {
            const cameras = await Camera.find(req.query);
            res.status(200).json(cameras);
        } else {
            const sensors = await Sensor.find({ type: tipo });
            res.status(200).json(sensors);
        }
    } catch (err) {
        manejarErrores(res, err, "Error al obtener dispositivos.");
    }
});

// #region Cameras
router.get("/camera/:id", async (req, res) => {
    try {
        const camera = await Camera.findById(req.params.id);
        if (!camera) {
            return res.status(404).json({ error: "Cámara no encontrada" });
        }
        res.status(200).json(camera);
    } catch (err) {
        manejarErrores(res, err, "Error al obtener la cámara.");
    }
});

router.post("/camera", async (req, res) => {
    try {
        const camera = await Camera.create(req.body);
        res.status(201).json(camera);
    } catch (err) {
        manejarErrores(res, err, "Error al crear la cámara.");
    }
});

router.put("/camera/:id", async (req, res) => {
    try {
        const camera = await Camera.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!camera) {
            return res.status(404).json({ error: "Cámara no encontrada" });
        }
        res.status(200).json(camera);
    } catch (err) {
        manejarErrores(res, err, "Error al actualizar la cámara.");
    }
});

router.delete("/camera/:id", async (req, res) => {
    console.log("Intentando eliminar cámara con ID:", req.params.id);
    try {
        const camera = await Camera.findByIdAndDelete(req.params.id);
        if (!camera) {
            console.log("Cámara no encontrada.");
            return res.status(404).json({ error: "Cámara no encontrada" });
        }
        console.log("Cámara eliminada con éxito:", camera);
        res.status(200).json({ message: "Cámara eliminada con éxito", camera });
    } catch (err) {
        manejarErrores(res, err, "Error al eliminar la cámara.");
    }
});
// #endregion

// #region Sensors
router.get("/sensor/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        res.status(200).json(sensor);
    } catch (err) {
        manejarErrores(res, err, "Error al obtener el sensor.");
    }
});

router.post("/sensor", async (req, res) => {
    try {
        const sensor = await Sensor.create(req.body);
        res.status(201).json(sensor);
    } catch (err) {
        manejarErrores(res, err, "Error al crear el sensor.");
    }
});

router.put("/sensor/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sensor) {
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        res.status(200).json(sensor);
    } catch (err) {
        manejarErrores(res, err, "Error al actualizar el sensor.");
    }
});

router.delete("/sensor/:id", async (req, res) => {
    console.log("Intentando eliminar sensor con ID:", req.params.id);
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            console.log("Sensor no encontrado.");
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        console.log("Sensor eliminado con éxito:", sensor);
        res.status(200).json({ message: "Sensor eliminado con éxito", sensor });
    } catch (err) {
        manejarErrores(res, err, "Error al eliminar el sensor.");
    }
});
// #endregion

module.exports = router;
