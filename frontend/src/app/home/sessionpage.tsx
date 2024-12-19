"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, CircularProgress, Grid, Card, CardContent } from "@mui/material";

const API_URL = "http://localhost:4000/sessions";

const SessionPage = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Error al obtener las sesiones");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

const handleViewDashboard = (sessionId: string) => {
  console.log("Redirigiendo al dashboard con sessionId:", sessionId); // Log para confirmar el sessionId
  router.push(`/home/dashboard?sessionId=${sessionId}`);
};

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sesiones

      </Typography>
      <Grid container spacing={2}>
        {sessions.map((session) => (
          <Grid item xs={12} sm={6} md={4} key={session._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Sujeto: {session.subject}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Usuario: {session.user?.fullname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Dispositivos: {session.devices.length}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDashboard(session._id)}
                  sx={{ marginTop: 2 }}
                >
                  Ver Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SessionPage;
