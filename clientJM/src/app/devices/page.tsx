"use client";

import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/mui";

export default function DevicesList() {
  const { dataGridProps } = useDataGrid({
    resource: "devices",
    syncWithLocation: true,
  });
  
  console.log("dataGridProps", dataGridProps);
  console.log("DataGrid Props:", dataGridProps.rows); // <-- Verifica los datos que llegan
  console.log("dataGridProps.rows", dataGridProps.rows);


  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "_id",
        headerName: "ID",
        type: "string",
        minWidth: 50,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        type: "string",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "type",
        headerName: "Type",
        type: "string",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "location",
        headerName: "Location",
        type: "string",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "protocol",
        headerName: "Protocol",
        type: "string",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        type: "string",
        minWidth: 150,
        flex: 1,
      },
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
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row._id} />
              <ShowButton hideText recordItemId={row._id} />
              <DeleteButton hideText recordItemId={row._id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 120,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
