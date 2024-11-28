"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box } from "@mui/material";
import { Create } from "@refinedev/mui";

export default function SensoresCreate() {
  const {
    refineCore: { onFinish, formLoading },
    saveButtonProps,
    register,
    handleSubmit, // Importante para manejar el envío
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onFinish(data); // Enviar los datos procesados a onFinish
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)} // Maneja el envío con handleSubmit
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          {...register("name", { required: "This field is required" })}
          label="Name"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("type", { required: "This field is required" })}
          label="Type"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("status", { required: "This field is required" })}
          label="Status"
          margin="normal"
          fullWidth
        />
      </Box>
    </Create>
  );
}
