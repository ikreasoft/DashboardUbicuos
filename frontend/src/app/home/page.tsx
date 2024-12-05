"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

const MOCK_DATA = {
  totalSensors: 50,
  activeSensors: 45,
  inactiveSensors: 5,
  events: 120,
  doors: {
    open: 8,
    closed: 42,
  },
  movementOverTime: {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    data: [5, 12, 8, 15, 9, 10],
  },
  doorStatus: {
    labels: ["Puertas Abiertas", "Puertas Cerradas"],
    data: [8, 42],
  },
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const, 
    },
    title: {
      display: true,
      text: "Eventos de Movimiento Detectados",
    },
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const, 
    },
    title: {
      display: true,
      text: "Estado Actual de las Puertas",
    },
  },
};

const Dashboard = () => {
  const [loading] = useState(false);

  const lineChartData = {
    labels: MOCK_DATA.movementOverTime.labels,
    datasets: [
      {
        label: "Eventos de Movimiento",
        data: MOCK_DATA.movementOverTime.data,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.5)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: MOCK_DATA.doorStatus.labels,
    datasets: [
      {
        label: "Estado de Puertas",
        data: MOCK_DATA.doorStatus.data,
        backgroundColor: ["#66BB6A", "#FF7043"],
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Sensores
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">Sensores Activos</Typography>
                  <Typography variant="h4" color="primary">
                    {MOCK_DATA.activeSensors}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">Sensores Inactivos</Typography>
                  <Typography variant="h4" color="error">
                    {MOCK_DATA.inactiveSensors}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">Eventos Detectados</Typography>
                  <Typography variant="h4" color="primary">
                    {MOCK_DATA.events}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">Puertas Abiertas</Typography>
                  <Typography variant="h4" color="secondary">
                    {MOCK_DATA.doors.open}
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
                    <Line data={lineChartData} options={lineChartOptions} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Bar data={barChartData} options={barChartOptions} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
