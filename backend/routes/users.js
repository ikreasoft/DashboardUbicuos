const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js"); // Modelo de usuarios
const Sensor = require("../models/Sensor.js"); // Modelo de sensores
const Camera = require("../models/Camera.js"); // Modelo de cámaras
const Session = require("../models/Session.js"); // Modelo de sesiones
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || "default_secret";

// Endpoint para registrar un usuario
router.post("/register", async (req, res) => {
  const { email, password, username, fullname } = req.body;

  if (!email || !password || !username || !fullname) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const user = new User({
      email,
      password,
      username,
      fullname,
      role: "user",
    });

    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error durante el registro:", err);
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

// Endpoint para iniciar sesión
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username y contraseña son requeridos" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (err) {
    console.error("Error inesperado durante el inicio de sesión:", err);
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

// Endpoint para validar el token
router.post("/validate-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
});

// Endpoint para obtener usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "fullname _id"); // Solo enviamos fullname e _id
    res.status(200).json(users);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Endpoint para obtener dispositivos (sensores y cámaras)
router.get("/devices", async (req, res) => {
  try {
    const sensors = await Sensor.find({}, "name id"); // Cambia los campos según tu modelo
    const cameras = await Camera.find({}, "name id");

    // Combina sensores y cámaras en una lista de dispositivos
    const devices = [
      ...sensors.map((sensor) => ({ ...sensor._doc, type: "Sensor" })),
      ...cameras.map((camera) => ({ ...camera._doc, type: "Camera" })),
    ];

    res.status(200).json(devices);
  } catch (err) {
    console.error("Error al obtener los dispositivos:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Endpoint para crear una sesión
router.post("/sessions/session", async (req, res) => {
  const { subject, user, devices } = req.body;

  if (!subject || !user || !devices || !Array.isArray(devices)) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const session = new Session({
      subject,
      user,
      devices,
    });

    await session.save();
    res.status(201).json({ message: "Sesión creada exitosamente" });
  } catch (err) {
    console.error("Error al crear la sesión:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
