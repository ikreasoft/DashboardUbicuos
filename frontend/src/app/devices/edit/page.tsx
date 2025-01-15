"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";

const API_URL = "http://localhost:4000";

const EditDevice: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // Obtener el ID del dispositivo desde la URL
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const selectedType = watch("type");

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await fetch(`${API_URL}/devices/${id}`);
        if (!response.ok) {
          throw new Error(`Error al obtener el dispositivo: ${response.status}`);
        }
        const device = await response.json();

        // Rellenar los valores del formulario
        Object.keys(device).forEach((key) => setValue(key, device[key]));
      } catch (err: any) {
        setError(err.message || "Error al cargar el dispositivo.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id, setValue]);

  const handleFormSubmit = async (data: any) => {
    // Determinar el recurso correcto basado en el tipo del dispositivo
    const resource = data.type === "Camera" ? "camera" : "sensor";

    try {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el dispositivo: ${response.statusText}`);
      }

      const updatedDevice = await response.json();
      console.log("Dispositivo actualizado:", updatedDevice);
      alert("Dispositivo actualizado con éxito");
      router.push("/devices"); // Volver a la lista de dispositivos
    } catch (error: any) {
      alert(error.message || "Error al actualizar el dispositivo.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Cargando dispositivo...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" style={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Dispositivo
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("name", { required: "Este campo es obligatorio" })}
          label="Nombre del dispositivo"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("location", { required: "Este campo es obligatorio" })}
          label="Ubicación"
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select {...register("type", { required: "Este campo es obligatorio" })} defaultValue="">
            <MenuItem value="Camera">Camera</MenuItem>
            <MenuItem value="Sensor">Sensor</MenuItem>
          </Select>
        </FormControl>
        <TextField
          {...register("protocol")}
          label="Protocolo"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("ipAddress")}
          label="Dirección IP"
          margin="normal"
          fullWidth
        />
        {selectedType === "Sensor" && (
          <>
            <TextField
              {...register("macAddress")}
              label="Dirección MAC"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("model")}
              label="Modelo"
              margin="normal"
              fullWidth
            />
          </>
        )}
        {selectedType === "Camera" && (
          <>
            <TextField
              {...register("firmwareVersion")}
              label="Versión del firmware"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("resolution")}
              label="Resolución"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("streamUrl")}
              label="URL de transmisión"
              margin="normal"
              fullWidth
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ marginTop: 3 }}
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </form>
    </Box>
  );
};

export default EditDevice;
