var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var User = require("../models/User.js");
var jwt = require("jsonwebtoken");
var { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Conexión con la base de datos
var db = mongoose.connection;

// Endpoint para obtener usuarios (Solo administradores)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuarios", error: err });
  }
});

// Endpoint para inicio de sesión con usuario y contraseña
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

    const isMatch = await user.comparePassword(password); // Método definido en el modelo User
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err });
  }
});

// Endpoint para inicio de sesión con Google OAuth
router.post("/signin/google", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "El token es requerido" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        fullname: name,
        username: email,
        role: "user",
      });
    }

    const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token: jwtToken });
  } catch (err) {
    console.error("Error en el inicio de sesión con Google:", err);
    res.status(401).json({ message: "Token de Google inválido", error: err });
  }
});

module.exports = router;
