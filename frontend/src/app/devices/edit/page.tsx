"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box } from "@mui/material";
import { Edit } from "@refinedev/mui";

export default function ModelEdit() {
  const {
    refineCore: { onFinish, formLoading },
    saveButtonProps,
    register,
    handleSubmit,
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onFinish(data); // Enviar los datos al backend
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          {...register("name", { required: "This field is required" })}
          label="Name"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("location", { required: "This field is required" })}
          label="Location"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("protocol")}
          label="Protocol"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("ipAddress")}
          label="IP Address"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("model")}
          label="Model"
          margin="normal"
          fullWidth
        />
      </Box>
    </Edit>
  );
}
