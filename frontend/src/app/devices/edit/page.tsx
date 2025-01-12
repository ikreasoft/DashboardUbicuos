"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box } from "@mui/material";
import { Edit } from "@refinedev/mui";

export default function EditDevice() {
  const {
    refineCore: { onFinish, formLoading },
    saveButtonProps,
    register,
    handleSubmit,
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onFinish(data); // Enviar los datos actualizados al backend
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <TextField
          {...register("type")}
          label="Tipo"
          margin="normal"
          fullWidth
        />
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
        <TextField
          {...register("macAddress")}
          label="Dirección MAC"
          margin="normal"
          fullWidth
        />
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
      </Box>
    </Edit>
  );
}
