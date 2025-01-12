// dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
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
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatAPIData = (apiData: any[]) => {
  const sensors = [...new Set(apiData.map((item) => item.location))];
  const doorsOpen = apiData.filter((item) => item.value > 0);
  const doorsClosed = apiData.filter((item) => item.value === 0);

  const sensorData = sensors.map((sensor) => {
    const events = apiData.filter((item) => item.location === sensor);
    return {
      sensor,
      timestamps: events.map((item) =>
        new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      values: events.map((item) => (item.value > 0 ? 1 : 0)),
    };
  });
  return { sensors, doorsOpen, doorsClosed, sensorData };
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
          throw new Error(
            `Error al obtener la información de la sesión: ${sessionResponse.status}`
          );
        }
        const sessionData = await sessionResponse.json();
        setSessionInfo(sessionData);

        const dataURL = `http://localhost:4000/sessions/data/${sessionId}`;
        const dataResponse = await fetch(dataURL);
        if (!dataResponse.ok) {
          throw new Error(
            `Error al obtener los datos de la sesión: ${dataResponse.status}`
          );
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Sensores
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Usuario: {sessionInfo.user.fullname}</Typography>
        <Typography variant="h6">Sujeto: {sessionInfo.subject}</Typography>
      </Box>

      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Activos</Typography>
              <Typography variant="h4" color="primary">
                {data.sensors.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Abiertos</Typography>
              <Typography variant="h4" color="secondary">
                {data.doorsOpen.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Sensores Cerrados</Typography>
              <Typography variant="h4" color="error">
                {data.doorsClosed.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {data.sensorData.map((sensor: any, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sensor: {sensor.sensor}
                </Typography>
                <Line
                  data={{
                    labels: sensor.timestamps,
                    datasets: [
                      {
                        label: "Estado del Sensor",
                        data: sensor.values,
                        borderColor: "#42A5F5",
                        backgroundColor: "rgba(66, 165, 245, 0.5)",
                        tension: 0.4,
                        pointRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          stepSize: 1,
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
