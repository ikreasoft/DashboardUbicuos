const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
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

    // Crear nuevo usuario
    const user = new User({
      email,
      password,
      username,
      fullname,
      role: "user", // Rol predeterminado
    });

    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

// Endpoint para inicio de sesión
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, TOKEN_SECRET, { expiresIn: "24h" });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error en el inicio de sesión:", err);
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

module.exports = router;
