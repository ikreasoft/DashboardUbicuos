// devices-dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

const DevicesDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  useEffect(() => {
    const loadDevices = async () => {
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

        const devicesURL = `http://localhost:4000/sessions/data/${sessionId}`;
        const devicesResponse = await fetch(devicesURL);
        if (!devicesResponse.ok) {
          throw new Error(
            `Error al obtener los dispositivos: ${devicesResponse.status}`
          );
        }
        const devicesData = await devicesResponse.json();
        setDevices(devicesData);
      } catch (err: any) {
        setError(err.message || "Error al cargar los dispositivos.");
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, [sessionId]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Cargando dispositivos...</Typography>
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

  if (!devices.length || !sessionInfo) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No hay dispositivos disponibles.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dispositivos Activos
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Usuario: {sessionInfo.user.fullname}</Typography>
        <Typography variant="h6">Sujeto: {sessionInfo.subject}</Typography>
      </Box>

      <Grid container spacing={4}>
        {devices.map((device: any, index: number) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Nombre: {device.name}</Typography>
                <Typography>Ubicación: {device.location}</Typography>
                <Typography>Protocolo: {device.protocol}</Typography>
                <Typography>IP: {device.ipAddress}</Typography>
                <Typography>Modelo: {device.model}</Typography>
                <Typography>Estado: {device.isActive ? "Activo" : "Inactivo"}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DevicesDashboard;
