var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Camera = require("../models/Camera.js");
var Model = require("../models/Model.js");
var Sensor = require("../models/Sensor.js");

mongoose.set("strictQuery", false);

// Middleware para manejar errores generales
function manejarErrores(res, err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
}

// Ruta principal para obtener dispositivos
router.get("/", function (req, res) {
    const tipo = req.query.type;
    var filtro = req.query;

    if (!tipo || tipo === "Camera") {
        Camera.find(filtro)
            .then((cameras) => res.status(200).json(cameras))
            .catch((err) => manejarErrores(res, err));
    } else {
        Sensor.find({ type: tipo })
            .then((sensores) => res.status(200).json(sensores))
            .catch((err) => manejarErrores(res, err));
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
        manejarErrores(res, err);
    }
});

router.post("/camera", async (req, res) => {
    try {
        const camera = await Camera.create(req.body);
        res.status(201).json(camera);
    } catch (err) {
        manejarErrores(res, err);
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
        manejarErrores(res, err);
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
        manejarErrores(res, err);
    }
});
// #endregion

// #region Models
router.get("/models", async (req, res) => {
    try {
        const models = await Model.find();
        res.status(200).json(models);
    } catch (err) {
        manejarErrores(res, err);
    }
});

router.get("/model/:id", async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        res.status(200).json(model);
    } catch (err) {
        manejarErrores(res, err);
    }
});

router.post("/model", async (req, res) => {
    try {
        const model = await Model.create(req.body);
        res.status(201).json(model);
    } catch (err) {
        manejarErrores(res, err);
    }
});

router.put("/model/:id", async (req, res) => {
    try {
        const model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!model) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        res.status(200).json(model);
    } catch (err) {
        manejarErrores(res, err);
    }
});

router.delete("/model/:id", async (req, res) => {
    try {
        const model = await Model.findByIdAndDelete(req.params.id);
        if (!model) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        res.status(200).json({ message: "Modelo eliminado con éxito", model });
    } catch (err) {
        manejarErrores(res, err);
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
        manejarErrores(res, err);
    }
});

router.post("/sensor", async (req, res) => {
    try {
        const sensor = await Sensor.create(req.body);
        res.status(201).json(sensor);
    } catch (err) {
        manejarErrores(res, err);
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
        manejarErrores(res, err);
    }
});

router.delete("/sensor/:id", async (req, res) => {
    console.log("Intentando eliminar sensor con ID:", req.params.id); // Log para verificar el ID recibido
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            console.log("Sensor no encontrado.");
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        console.log("Sensor eliminado con éxito:", sensor);
        res.status(200).json({ message: "Sensor eliminado con éxito", sensor });
    } catch (err) {
        console.error("Error al eliminar sensor:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// #endregion

module.exports = router;
