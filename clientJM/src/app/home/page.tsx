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
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:4000"; // URL del backend

const Home: React.FC = () => {
  const [lineData, setLineData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [metrics, setMetrics] = useState({
    totalDataPoints: 0,
    types: {},
  });

  // Obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/sensor-data`);
      const sensorData = await response.json();

      // Extraer métricas
      const totalDataPoints = sensorData.length;
      const typeCounts: Record<string, number> = {};

      sensorData.forEach((item: any) => {
        typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
      });

      // Procesar datos para el gráfico
      const labels = sensorData.map((item: any) => item.from);
      const values = sensorData.map((item: any) => item.value);

      setLineData({
        labels,
        datasets: [
          {
            label: "Sensor Values",
            data: values,
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66, 165, 245, 0.5)",
            fill: true,
          },
        ],
      });

      setMetrics({
        totalDataPoints,
        types: typeCounts,
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lineOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sensor Data Over Time",
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sensor Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Métricas principales */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Data Points</Typography>
            <Typography variant="h4" color="primary">
              {metrics.totalDataPoints}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Type Breakdown</Typography>
            {Object.entries(metrics.types).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Box sx={{ marginTop: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sensor Values Over Time
            </Typography>
            <Line data={lineData} options={lineOptions} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
