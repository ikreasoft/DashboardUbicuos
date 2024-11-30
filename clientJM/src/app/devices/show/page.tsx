"use client";

import React from "react";
import { Show } from "@refinedev/mui"; // Importa solo lo necesario de refine
import { useShow } from "@refinedev/core"; // Para obtener los datos
import { Typography } from "@mui/material"; // Corrige el import de Typography

export default function DeviceShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show>
      <Typography variant="h6" gutterBottom>
        Device Details
      </Typography>
      <Typography>
        <strong>Name:</strong> {record?.name}
      </Typography>
      <Typography>
        <strong>Location:</strong> {record?.location}
      </Typography>
      <Typography>
        <strong>Protocol:</strong> {record?.protocol}
      </Typography>
      <Typography>
        <strong>IP Address:</strong> {record?.ipAddress}
      </Typography>
      <Typography>
        <strong>Status:</strong> {record?.status}
      </Typography>
    </Show>
  );
}
