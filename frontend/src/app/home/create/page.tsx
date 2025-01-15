"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:4000/sessions";

// Define explícitamente el tipo de los datos del formulario
type FormDataType = {
  subject: string;
  user: string;
  devices: string[]; // Aquí definimos que "devices" es un array de strings
};

const CreateSessionPage = () => {
  const [formData, setFormData] = useState<FormDataType>({
    subject: "",
    user: "",
    devices: [], // Inicializamos devices como un array vacío
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Maneja los dispositivos separando los IDs por comas
    if (name === "devices") {
      setFormData((prev) => ({
        ...prev,
        devices: value.split(",").map((device) => device.trim()), // Elimina espacios adicionales
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la sesión");
      }

      // Redirige de vuelta a la lista de sesiones
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nueva Sesión
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sujeto"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Usuario"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dispositivos (IDs separados por comas)"
            name="devices"
            value={formData.devices.join(", ")} // Muestra los dispositivos como una cadena
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/home")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Crear Sesión"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateSessionPage;
