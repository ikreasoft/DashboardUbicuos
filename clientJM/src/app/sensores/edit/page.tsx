"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box } from "@mui/material";
import { Edit } from "@refinedev/mui";

export default function SensoresEdit() {
  const {
    refineCore: { onFinish, formLoading },
    saveButtonProps,
    register,
    handleSubmit,
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onFinish(data); // Pasa los datos del formulario a onFinish
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)} // Usa handleSubmit para manejar el envío
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
    </Edit>
  );
}
