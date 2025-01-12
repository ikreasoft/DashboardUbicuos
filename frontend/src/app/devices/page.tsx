"use client";

import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/mui";
import { Box, Typography } from "@mui/material";

export default function DevicesList() {
  const { dataGridProps } = useDataGrid({
    resource: "devices", // Recurso sincronizado con el backend
    syncWithLocation: true, // Sincronización con la URL
  });

  // Mapeo de `_id` a `id` para que funcione con DataGrid
  const rows = dataGridProps?.rows?.map((row) => ({
    ...row,
    id: row._id, // Mapea `_id` del backend a `id` esperado por DataGrid
  })) || [];

  // Definición de columnas para la tabla
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", type: "string", minWidth: 50, flex: 1 },
      { field: "name", headerName: "Name", type: "string", minWidth: 150, flex: 1 },
      { field: "location", headerName: "Location", type: "string", minWidth: 150, flex: 1 },
      { field: "protocol", headerName: "Protocol", type: "string", minWidth: 100, flex: 1 },
      { field: "ipAddress", headerName: "IP Address", type: "string", minWidth: 150, flex: 1 },
      { field: "type", headerName: "Type", type: "string", minWidth: 100, flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
            <DeleteButton hideText recordItemId={row.id} />
          </>
        ),
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ],
    [] // Dependencias vacías para evitar recrear columnas
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Dispositivos
      </Typography>
      <Box sx={{ marginBottom: 2, textAlign: "right" }}>
        <CreateButton />
      </Box>
      <List>
        {/* DataGrid para listar los dispositivos */}
        <DataGrid {...dataGridProps} rows={rows} columns={columns} autoHeight />
      </List>
    </Box>
  );
}
