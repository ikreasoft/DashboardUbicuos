"use client";

import React from "react";
import { useShow } from "@refinedev/core"; // Cambia el import
import { Create, Edit, List, Show } from "@refinedev/mui";
import { Typography, Box } from "@mui/material";

export default function SensoresShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show>
      <Box>
        <Typography variant="h6">Name</Typography>
        <Typography>{record?.name}</Typography>

        <Typography variant="h6">Type</Typography>
        <Typography>{record?.type}</Typography>

        <Typography variant="h6">Status</Typography>
        <Typography>{record?.status}</Typography>
      </Box>
    </Show>
  );
}
