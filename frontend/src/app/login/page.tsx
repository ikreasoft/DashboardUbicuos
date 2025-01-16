"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const API_URL = "http://localhost:4000/users"; // Asegúrate de que coincida con tu backend

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Correo o contraseña inválidos.");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token); // Guarda el token en localStorage
      setError(""); // Limpia cualquier mensaje de error previo

      // Redirigir al dashboard o página principal
      window.location.href = "/home"; 
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
        width="300px"
      >
        <Typography variant="h4" align="center">
          Iniciar Sesión
        </Typography>

        {/* Campo de Correo */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        {/* Campo de Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        {/* Botón para Login */}
        <Button variant="contained" size="large" fullWidth onClick={handleLogin}>
          Iniciar Sesión
        </Button>

        {/* Mostrar errores */}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Enlace para ir a la página de registro */}
        <Typography align="center">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
