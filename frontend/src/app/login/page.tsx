"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useAuth } from "@contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setLoading(false);
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

        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

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
