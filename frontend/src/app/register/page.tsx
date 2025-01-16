"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const API_URL = "http://localhost:4000/users";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password || !fullname) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          fullname,
          role: "user", // Asegurarte de incluir el rol aquí
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al registrar usuario.");
      }

      alert("Usuario registrado exitosamente.");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido.");
      }
    }
  };

  return (
    <Container style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Box display="flex" flexDirection="column" gap="20px" width="300px">
        <Typography variant="h4" align="center">Regístrate</Typography>

        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Correo"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nombre Completo"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button variant="contained" onClick={handleRegister}>
          Registrarse
        </Button>
      </Box>
    </Container>
  );
}
