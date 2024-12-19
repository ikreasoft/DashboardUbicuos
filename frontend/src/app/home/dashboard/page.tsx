// dashboard.tsx
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
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";
import { Box, Grid, Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const formatAPIData = (apiData: any[]) => {
  const timestamps = apiData.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const doorsOpen = apiData.filter((item) => item.value > 0);
  const doorsClosed = apiData.filter((item) => item.value === 0);

  return {
    activeSensors: [...new Set(apiData.map((item) => item.location))],
    doors: {
      open: doorsOpen,
      closed: doorsClosed,
    },
    doorsOverTime: {
      labels: timestamps,
      open: doorsOpen.map((item) => item.location),
      closed: doorsClosed.map((item) => item.location),
    },
  };
};

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!sessionId) {
        setError("No se proporcionó un ID de sesión.");
        setLoading(false);
        return;
      }

      try {
        const sessionURL = `http://localhost:4000/sessions/session/${sessionId}`;
        const sessionResponse = await fetch(sessionURL);
        if (!sessionResponse.ok) {
          throw new Error(`Error al obtener la información de la sesión: ${sessionResponse.status}`);
        }
        const sessionData = await sessionResponse.json();
        setSessionInfo(sessionData);

        const dataURL = `http://localhost:4000/sessions/data/${sessionId}`;
        const dataResponse = await fetch(dataURL);
        if (!dataResponse.ok) {
          throw new Error(`Error al obtener los datos de la sesión: ${dataResponse.status}`);
        }
        const apiData = await dataResponse.json();
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

  if (!data || !sessionInfo) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No hay datos disponibles.
      </Typography>
    );
  }

  const barChartData = {
    labels: ["Sensores Abiertos", "Sensores Cerrados"],
    datasets: [
      {
        label: "Estado de los Sensores",
        data: [data.doors.open.length, data.doors.closed.length],
        backgroundColor: ["#66BB6A", "#FF7043"],
      },
    ],
  };

  const timelineChartData = {
    labels: data.doorsOverTime.labels,
    datasets: [
      {
        label: "Aperturas",
        data: data.doors.open.map((item, index) => ({
          x: data.doorsOverTime.labels[index], // Tiempo
          y: 1, // Valor constante para marcar apertura
        })),
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        pointRadius: 5, // Tamaño de los puntos
        showLine: false, // No conectar puntos con líneas
      },
      {
        label: "Cierres",
        data: data.doors.closed.map((item, index) => ({
          x: data.doorsOverTime.labels[index], // Tiempo
          y: 0, // Valor constante para marcar cierre
        })),
        borderColor: "#F44336",
        backgroundColor: "#F44336",
        pointRadius: 5, // Tamaño de los puntos
        showLine: false, // No conectar puntos con líneas
      },
    ],    
  };

  const scatterChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", // Eje X categórico basado en tiempo
        title: {
          display: true,
          text: "Tiempo",
        },
      },
      y: {
        type: "linear",
        min: -0.5, // Margen para mejorar visualización
        max: 1.5,
        ticks: {
          stepSize: 1,
          callback: (value) => (value === 1 ? "Apertura" : "Cierre"),
        },
        title: {
          display: true,
          text: "Estado",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            return `${label} - Hora: ${context.raw.x}`;
          },
        },
      },
    },
  };

  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Sensores
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Usuario: {sessionInfo.user.fullname}</Typography>
        <Typography variant="h6">Sujeto: {sessionInfo.subject}</Typography>
      </Box>

      <Grid container spacing={2}>        
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Abiertos</Typography>
              <Typography variant="h4" color="secondary">
                {data.doors.open.length}
              </Typography>
             
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Cerrados</Typography>
              <Typography variant="h4" color="error">
                {data.doors.closed.length}
              </Typography>
              
            </CardContent>
          </Card>
        </Grid>
       
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Activos</Typography>
              <Typography variant="h4" color="primary">
                {data.activeSensors.length}
              </Typography>
              <Grid container spacing={2}>
              {data.activeSensors.map((sensor: string, index: number) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">Sensor</Typography>
                        <Typography variant="body1">{sensor}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Bar data={barChartData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Bar data={timelineChartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
