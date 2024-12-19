"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation"; // Import para manejar los query params

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

const formatAPIData = (apiData: any[]) => {
  const movementData = apiData.map((item) => item.value || 0);
  const timestamps = apiData.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const doorsOpen = apiData.filter((item) => item.value > 0).length;
  const doorsClosed = apiData.length - doorsOpen;

  return {
    activeSensors: apiData.length,
    events: movementData.reduce((sum, value) => sum + value, 0),
    doors: { open: doorsOpen, closed: doorsClosed },
    movementOverTime: {
      labels: timestamps,
      data: movementData,
    },
  };
};

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams(); // Hook para leer parámetros de la URL
  const sessionId = searchParams.get("sessionId"); // Extrae el sessionId de los parámetros de consulta

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!sessionId) {
        setError("No se proporcionó un ID de sesión.");
        setLoading(false);
        return;
      }

      try {
        const API_URL = `http://localhost:4000/sessions/data/${sessionId}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos de la sesión: ${response.status}`);
        }
        const apiData = await response.json();
        if (apiData.length === 0) {
          throw new Error("No se encontraron datos para esta sesión.");
        }
        const formattedData = formatAPIData(apiData);
        setData(formattedData);
      } catch (err: any) {
        setError(err.message || "Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sessionId]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Cargando datos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" style={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No hay datos disponibles.
      </Typography>
    );
  }

  const lineChartData = {
    labels: data.movementOverTime.labels,
    datasets: [
      {
        label: "Eventos Detectados",
        data: data.movementOverTime.data,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.5)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Puertas Abiertas", "Puertas Cerradas"],
    datasets: [
      {
        label: "Estado de las Puertas",
        data: [data.doors.open, data.doors.closed],
        backgroundColor: ["#66BB6A", "#FF7043"],
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Sensores
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Activos</Typography>
              <Typography variant="h4" color="primary">
                {data.activeSensors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Puertas Abiertas</Typography>
              <Typography variant="h4" color="secondary">
                {data.doors.open}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Puertas Cerradas</Typography>
              <Typography variant="h4" color="error">
                {data.doors.closed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Line data={lineChartData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Bar data={barChartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
