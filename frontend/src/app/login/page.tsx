"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useLogin } from "@refinedev/core";

export default function Login() {
  const { mutate: login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Llama al login con email y contraseña
      await login({ email, password });
    } catch (err: any) {
      setError("Invalid email or password.");
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
          Login
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
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        {/* Botón para Login */}
        <Button variant="contained" size="large" fullWidth onClick={handleLogin}>
          Sign in
        </Button>

        {/* Muestra errores */}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Botón para Login con Google */}
        <Button
          style={{ width: "100%", marginTop: "12px" }}
          variant="outlined"
          size="large"
          onClick={() => login({ provider: "google" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}
