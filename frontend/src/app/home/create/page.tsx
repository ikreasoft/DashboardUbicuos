"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:4000";

type FormDataType = {
  subject: string;
  user: string;
  devices: string[];
};

const CreateSessionPage = () => {
  const [formData, setFormData] = useState<FormDataType>({
    subject: "",
    user: "",
    devices: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ fullname: string; _id: string }[]>([]);
  const [devices, setDevices] = useState<{ name: string; id: string }[]>([]);
  const router = useRouter();

  // Fetch users and devices on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Formato de usuarios inválido");
        setUsers(data); // Asume que el backend devuelve [{ fullname, _id }]
      } catch (err) {
        console.error(err);
        setError("Error al cargar los usuarios");
      }
    };

    const fetchDevices = async () => {
      try {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) throw new Error("Error al obtener los dispositivos");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Formato de dispositivos inválido");
        setDevices(data); // Asume que el backend devuelve [{ name, id }]
      } catch (err) {
        console.error(err);
        setError("Error al cargar los dispositivos");
      }
    };

    fetchUsers();
    fetchDevices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeviceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDevices = event.target.value as string[];
    setFormData((prev) => ({
      ...prev,
      devices: selectedDevices,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const user = users.find((u) => u.fullname === formData.user);
    if (!user) {
      setError("Usuario no encontrado");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/sessions/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, user: user._id }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la sesión");
      }

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
            select
            fullWidth
            label="Usuario"
            name="user"
            value={formData.user}
            onChange={(e) => setFormData((prev) => ({ ...prev, user: e.target.value }))}
            variant="outlined"
            helperText="Selecciona un usuario de la lista"
          >
            {users.map((u) => (
              <MenuItem key={u._id} value={u.fullname}>
                {u.fullname}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Dispositivos"
            name="devices"
            value={formData.devices} // Aquí aseguramos que es un arreglo
            onChange={handleDeviceChange}
            variant="outlined"
            helperText="Selecciona dispositivos disponibles"
            SelectProps={{
              multiple: true,
            }}
          >
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </TextField>
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
