"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home: React.FC = () => {
  // Datos para el gráfico de línea
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sensor Values",
        data: [400, 300, 200, 278, 189],
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.5)",
        fill: true,
      },
    ],
  };

  const lineOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sensor Values Over Time",
      },
    },
  };

  // Datos para el gráfico de barras
  const barData = {
    labels: ["Active", "Inactive", "Error"],
    datasets: [
      {
        label: "Sensor Status",
        data: [45, 20, 10],
        backgroundColor: ["#66BB6A", "#FF7043", "#FFCA28"],
      },
    ],
  };

  const barOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sensor Status Distribution",
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Tarjetas de métricas principales */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Active Sensors</Typography>
            <Typography variant="h4" color="primary">
              684
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Inactive Sensors</Typography>
            <Typography variant="h4" color="error">
              120
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Errors Detected</Typography>
            <Typography variant="h4" color="warning">
              15
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Readings</Typography>
            <Typography variant="h4" color="secondary">
              12,345
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
        <Card sx={{ width: 500, height: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sensor Values (Line Chart)
            </Typography>
            <Line data={lineData} options={lineOptions} />
          </CardContent>
        </Card>

        <Card sx={{ width: 500, height: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sensor Status (Bar Chart)
            </Typography>
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
