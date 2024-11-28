"use client";

import React from "react";
import { useList } from "@refinedev/core";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";

const Home: React.FC = () => {
  // Carga de datos desde el backend
  const { data, isLoading, error } = useList({
    resource: "sensors", // Endpoint de tu backend (por ejemplo, /sensors)
  });

  if (isLoading) {
    return <Typography>Cargando datos...</Typography>;
  }

  if (error) {
    return <Typography>Error al cargar datos: {error.message}</Typography>;
  }

  // Datos para gráficos
  const lineData = {
    labels: data?.data.map((sensor) => sensor.name),
    datasets: [
      {
        label: "Sensor Values",
        data: data?.data.map((sensor) => sensor.value),
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Tarjetas con datos resumidos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sensores</Typography>
              <Typography variant="h4">
                {data?.data?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Box sx={{ marginTop: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Valores de Sensores</Typography>
            <Line data={lineData} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
