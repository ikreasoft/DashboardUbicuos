"use client";

import React, { useEffect, useState } from "react";
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

const API_URL = "http://localhost:3000"; // Cambia esto si tu backend está en otra URL

const Home: React.FC = () => {
  // Estado para los datos de los gráficos
  const [lineData, setLineData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [barData, setBarData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [metrics, setMetrics] = useState({
    activeSensors: 0,
    inactiveSensors: 0,
    errorSensors: 0,
    totalReadings: 0,
  });

  // Obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/sensors`); // Endpoint del backend para sensores
      const sensors = await response.json();

      // Procesar los datos para el gráfico de líneas
      const months = ["January", "February", "March", "April", "May"];
      const sensorValues = sensors.map((sensor: any) => sensor.value);

      setLineData({
        labels: months,
        datasets: [
          {
            label: "Sensor Values",
            data: sensorValues.slice(0, months.length),
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66, 165, 245, 0.5)",
            fill: true,
          },
        ],
      });

      // Procesar los datos para el gráfico de barras
      const active = sensors.filter((sensor: any) => sensor.status === "active").length;
      const inactive = sensors.filter((sensor: any) => sensor.status === "inactive").length;
      const error = sensors.filter((sensor: any) => sensor.status === "error").length;

      setBarData({
        labels: ["Active", "Inactive", "Error"],
        datasets: [
          {
            label: "Sensor Status",
            data: [active, inactive, error],
            backgroundColor: ["#66BB6A", "#FF7043", "#FFCA28"],
          },
        ],
      });

      // Actualizar métricas principales
      setMetrics({
        activeSensors: active,
        inactiveSensors: inactive,
        errorSensors: error,
        totalReadings: sensors.length,
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Opciones para los gráficos
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
              {metrics.activeSensors}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Inactive Sensors</Typography>
            <Typography variant="h4" color="error">
              {metrics.inactiveSensors}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Errors Detected</Typography>
            <Typography variant="h4" color="warning">
              {metrics.errorSensors}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Readings</Typography>
            <Typography variant="h4" color="secondary">
              {metrics.totalReadings}
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
