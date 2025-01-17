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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Para editar
  const [deviceToEdit, setDeviceToEdit] = useState<any | null>(null); // Dispositivo seleccionado para editar
  const [deviceToDelete, setDeviceToDelete] = useState<any | null>(null);
  const [deviceType, setDeviceType] = useState<string>(""); // Tipo de dispositivo seleccionado
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

  const handleOpenEditDialog = (device: any) => {
    setDeviceToEdit(device);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setDeviceToEdit(null);
    setDeviceType(""); // Reinicia el tipo de dispositivo seleccionado
    setEditDialogOpen(false);
  };

  const handleEditDevice = () => {
    if (!deviceType) {
      alert("Por favor selecciona el tipo de dispositivo.");
      return;
    }

    const resource = deviceType === "Camera" ? "camera" : "sensor";
    router.push(`/devices/edit/${resource}/${deviceToEdit._id}`);
  };

  const handleOpenDeleteDialog = (device: any) => {
    setDeviceToDelete(device);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeviceToDelete(null);
    setDeviceType(""); // Reinicia el tipo de dispositivo seleccionado
    setDeleteDialogOpen(false);
  };

  const handleDeleteDevice = async () => {
    if (!deviceToDelete || !deviceType) {
      alert("Selecciona el tipo de dispositivo antes de eliminar.");
      return;
    }

    const resource = deviceType === "Camera" ? "devices/camera" : "devices/sensor";
    const url = `${API_URL}/${resource}/${deviceToDelete._id}`;
    console.log("Intentando eliminar dispositivo desde:", url);

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Contenido devuelto por el servidor:", errorText);
        throw new Error(`Error al eliminar: ${response.status}`);
      }

      setDevices((prev) => prev.filter((d) => d._id !== deviceToDelete._id)); // Actualiza la lista
      setDeleteDialogOpen(false);
      alert("Dispositivo eliminado con éxito.");
    } catch (err: unknown) {
      console.error("Error al eliminar dispositivo:", err);
      alert("Hubo un error al eliminar el dispositivo.");
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
                    onClick={() => handleOpenEditDialog(device)}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el dispositivo{" "}
            <strong>{deviceToDelete?.name}</strong>? Por favor, selecciona el
            tipo de dispositivo para confirmar.
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Dispositivo</InputLabel>
            <Select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <MenuItem value="Camera">Camera</MenuItem>
              <MenuItem value="Sensor">Sensor</MenuItem>
            </Select>
          </FormControl>
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

      {/* Diálogo de confirmación para editar */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Confirmar edición</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas editar el dispositivo{" "}
            <strong>{deviceToEdit?.name}</strong>? Por favor, selecciona el
            tipo de dispositivo para continuar.
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Dispositivo</InputLabel>
            <Select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <MenuItem value="Camera">Camera</MenuItem>
              <MenuItem value="Sensor">Sensor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditDevice} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DevicesPage;
