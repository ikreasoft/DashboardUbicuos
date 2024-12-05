"use client";

import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";

export default function DevicesList() {
  const { dataGridProps } = useDataGrid({
    resource: "devices", // Usa el recurso funcional
    syncWithLocation: true,
  });

  // Mapea `_id` a `id`
  const rows = dataGridProps.rows?.map((row) => ({
    ...row,
    id: row._id, // Mapea `_id` del backend a `id` para el frontend
  })) || [];

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", type: "string", minWidth: 50, flex: 1 },
      { field: "name", headerName: "Name", type: "string", minWidth: 150, flex: 1 },
      { field: "type", headerName: "Type", type: "string", minWidth: 100, flex: 1 },
      { field: "location", headerName: "Location", type: "string", minWidth: 150, flex: 1 },
      { field: "protocol", headerName: "Protocol", type: "string", minWidth: 100, flex: 1 },
      { field: "ipAddress", headerName: "IP Address", type: "string", minWidth: 150, flex: 1 },
      {
        field: "isActive",
        headerName: "Active",
        type: "boolean",
        minWidth: 80,
        flex: 1,
        valueGetter: (params) => (params.row.isActive ? "Yes" : "No"),
      },
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
        minWidth: 120,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} rows={rows} columns={columns} autoHeight />
    </List>
  );
}
