"use client";

import React from "react";
import { useShow } from "@refinedev/react-hook-form";
import { Show, Typography, Box } from "@mui/material";

export default function ShowDevice() {
  const { queryResult, isLoading } = useShow();
  const record = queryResult?.data?.data;

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  if (!record) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          No se encontraron datos para este dispositivo.
        </Typography>
      </Box>
    );
  }

  return (
    <Show>
      <Typography variant="h5" gutterBottom>
        Detalles del Dispositivo
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>Nombre: </strong>
          {record.name}
        </Typography>
        <Typography variant="body1">
          <strong>Ubicación: </strong>
          {record.location}
        </Typography>
        <Typography variant="body1">
          <strong>Tipo: </strong>
          {record.type || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Protocolo: </strong>
          {record.protocol || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Dirección IP: </strong>
          {record.ipAddress || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Dirección MAC: </strong>
          {record.macAddress || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Versión del Firmware: </strong>
          {record.firmwareVersion || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Resolución: </strong>
          {record.resolution || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>URL de Transmisión: </strong>
          {record.streamUrl || "N/A"}
        </Typography>
      </Box>
    </Show>
  );
}
