"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Create } from "@refinedev/mui";

export default function CreateDevice() {
  const {
    refineCore: { formLoading },
    register,
    handleSubmit,
    watch,
  } = useForm();

  const selectedType = watch("type"); // Observa el campo "type"

  const handleFormSubmit = async (data: any) => {
    console.log("Datos enviados al backend:", data); // Log para depurar

    // Define el recurso dinámicamente basado en el tipo
    const resource = data.type === "Camera" ? "devices/camera" : "devices/sensor";

    try {
      const response = await fetch(`http://localhost:4000/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Dispositivo creado:", result);
      alert("Dispositivo creado con éxito");
    } catch (error) {
      console.error("Error al crear el dispositivo:", error);
      alert("Hubo un error al crear el dispositivo");
    }
  };

  return (
    <Create isLoading={formLoading}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
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
          <Select
            {...register("type", { required: "Este campo es obligatorio" })}
            defaultValue=""
          >
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
        <button type="submit" style={{ marginTop: "20px", padding: "10px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Crear Dispositivo
        </button>
      </Box>
    </Create>
  );
}
