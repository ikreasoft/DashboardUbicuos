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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Agregado para manejar estados de carga

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña.");
      console.error("Error: Faltan datos (username o password).");
      return;
    }

    setLoading(true); // Activar estado de carga
    setError(""); // Limpiar errores previos

    try {
      console.log("Enviando datos al backend:", { username, password });

      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Respuesta del backend recibida:", response);

      if (!response.ok) {
        const data = await response.json();
        console.error("Error recibido del backend:", data);
        throw new Error(data.message || "Usuario o contraseña inválidos.");
      }

      const { token } = await response.json();
      console.log("Token recibido:", token);

      if (!token) {
        throw new Error("No se recibió un token válido.");
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", token);

      console.log("Token guardado en localStorage. Redirigiendo...");
      window.location.href = "/home"; // Redirigir al dashboard
    } catch (err) {
      console.error("Error durante el inicio de sesión:", err);
      setError(err instanceof Error ? err.message : "Error desconocido al iniciar sesión.");
    } finally {
      setLoading(false); // Desactivar estado de carga
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

        {/* Campo de Usuario */}
        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          disabled={loading} // Deshabilitar durante la carga
        />

        {/* Campo de Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          disabled={loading} // Deshabilitar durante la carga
        />

        {/* Botón para Login */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
          disabled={loading} // Deshabilitar durante la carga
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
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
