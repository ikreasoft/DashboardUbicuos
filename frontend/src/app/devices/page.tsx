"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  CardMedia,
  Collapse,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:4000";

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) {
          throw new Error(`Error al obtener los dispositivos: ${response.status}`);
        }
        const data = await response.json();
        setDevices(data);

        const initialExpandedState = data.reduce(
          (acc: Record<string, boolean>, device: any) => {
            acc[device._id] = false;
            return acc;
          },
          {}
        );
        setExpanded(initialExpandedState);
      } catch (err: any) {
        setError(err.message || "Error al cargar los dispositivos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateDevice = () => {
    router.push("/devices/create");
  };

  const handleEditDevice = (id: string) => {
    router.push(`/devices/edit/${id}`);
  };

  const handleOpenDeleteDialog = (device: any) => {
    setDeviceToDelete(device);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeviceToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteDevice = async () => {
    if (!deviceToDelete) return;

    const resource = deviceToDelete.type === "Camera" ? "camera" : "sensor"; // Determina el tipo
    const url = `${API_URL}/${resource}/${deviceToDelete._id}`; // Construye la URL
    console.log("Eliminando desde:", url); // Log para confirmar la URL

    try {
        const response = await fetch(url, { method: "DELETE" });

        if (!response.ok) {
            const errorText = await response.text(); // Captura el texto de error
            console.error("Contenido devuelto por el servidor:", errorText);
            throw new Error(`Error al eliminar: ${response.status}`);
        }

        setDevices((prev) => prev.filter((d) => d._id !== deviceToDelete._id)); // Actualiza la lista
        setDeleteDialogOpen(false);
        alert("Dispositivo eliminado con éxito.");
    } catch (err: any) {
        console.error("Error al eliminar:", err.message);
        alert(err.message || "Hubo un error al eliminar el dispositivo.");
    }
};

  const getImageForDevice = (type: string) => {
    const images: Record<string, string> = {
      Camera: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSQGZ_TH21-actv6toe58nxo6tsg_iOtI5kg&s",
      Humidity: "https://www.matecmedicion.com.ar/wp-content/uploads/2021/12/EE210_Gruppe_RGB_300dpi-2-335x335.jpg",
      Default: "https://via.placeholder.com/150?text=Device",
    };
    return images[type] || images["Default"];
  };

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

  if (!devices.length) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No hay dispositivos disponibles.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Dispositivos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateDevice}
        >
          Crear Nuevo Dispositivo
        </Button>
      </Box>

      <Grid container spacing={4}>
        {devices.map((device: any) => (
          <Grid item xs={12} md={6} lg={4} key={device._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={device.imageUrl || getImageForDevice(device.type)}
                alt={device.name}
              />
              <CardContent>
                <Typography variant="h6">{device.name}</Typography>
                <Typography>
                  Estado:{" "}
                  <Chip
                    label={device.isActive ? "Activo" : "Inactivo"}
                    sx={{
                      backgroundColor: device.isActive ? "green" : "red",
                      color: "white",
                    }}
                  />
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditDevice(device._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteDialog(device)}
                  >
                    Eliminar
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    Más información
                  </Typography>
                  <IconButton
                    onClick={() => toggleExpand(device._id)}
                    aria-expanded={expanded[device._id]}
                    aria-label="mostrar más"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
                <Collapse in={expanded[device._id]} timeout="auto" unmountOnExit>
                  <Box sx={{ marginTop: 2 }}>
                    {device.type && <Typography>Tipo: {device.type}</Typography>}
                    {device.location && <Typography>Ubicación: {device.location}</Typography>}
                    {device.ipAddress && <Typography>IP: {device.ipAddress}</Typography>}
                    {device.macAddress && <Typography>MAC: {device.macAddress}</Typography>}
                    {device.model && <Typography>Modelo: {device.model}</Typography>}
                    {device.firmwareVersion && (
                      <Typography>Firmware: {device.firmwareVersion}</Typography>
                    )}
                    {device.lastConnection && (
                      <Typography>
                        Última Conexión: {new Date(device.lastConnection).toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el dispositivo{" "}
            <strong>{deviceToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteDevice} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DevicesPage;
