"use client";

import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/mui";

export default function SensoresList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true, // Sincroniza la paginación con la URL
  });

  const { data: sensorTypeData, isLoading: sensorTypeIsLoading } = useMany({
    resource: "sensorTypes", // Cambia este recurso si es diferente
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.type?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "type",
        headerName: "Type",
        flex: 1,
        minWidth: 150,
        valueGetter: ({ row }) => {
          const value = row?.type;
          return value;
        },
        renderCell: function render({ value }) {
          return sensorTypeIsLoading ? (
            <>Loading...</>
          ) : (
            sensorTypeData?.data?.find((item) => item.id === value?.id)?.title
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [sensorTypeData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
