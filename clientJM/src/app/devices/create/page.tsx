"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Box } from "@mui/material";
import { Create } from "@refinedev/mui";

export default function ModelCreate() {
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
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <TextField
          {...register("macAddress")}
          label="MAC Address"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("firmwareVersion")}
          label="Firmware Version"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("resolution")}
          label="Resolution"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("streamUrl")}
          label="Stream URL"
          margin="normal"
          fullWidth
        />
      </Box>
    </Create>
  );
}
