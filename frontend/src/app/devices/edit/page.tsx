"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";

const API_URL = "http://localhost:4000";

const EditDevice: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<string>(""); // Tipo del dispositivo
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const formType = watch("type");

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await fetch(`${API_URL}/devices/${id}`);
        if (!response.ok) {
          throw new Error(`Error al obtener el dispositivo: ${response.status}`);
        }
        const device = await response.json();

        // Rellenar los valores del formulario
        Object.keys(device).forEach((key) => setValue(key, device[key]));
        setDeviceType(device.type); // Establecer el tipo del dispositivo
      } catch (err: any) {
        setError(err.message || "Error al cargar el dispositivo.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id, setValue]);

  const handleFormSubmit = async (data: any) => {
    const resource = data.type === "Camera" ? "camera" : "sensor";

    try {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el dispositivo: ${response.statusText}`);
      }

      const updatedDevice = await response.json();
      console.log("Dispositivo actualizado:", updatedDevice);
      alert("Dispositivo actualizado con éxito");
      router.push("/devices");
    } catch (error: any) {
      alert(error.message || "Error al actualizar el dispositivo.");
    }
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleDeleteDevice = async () => {
    if (!deviceType) {
      alert("Por favor selecciona el tipo de dispositivo.");
      return;
    }

    try {
      const resource = deviceType === "Camera" ? "camera" : "sensor";
      const deleteUrl = `${API_URL}/${resource}/${id}`;
      console.log("Intentando eliminar desde:", deleteUrl); // Log para depuración

      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el dispositivo: ${response.status}`);
      }

      alert("Dispositivo eliminado con éxito");
      router.push("/devices");
    } catch (error: any) {
      console.error("Error al eliminar el dispositivo:", error);
      alert(error.message || "Error al eliminar el dispositivo.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Cargando dispositivo...</Typography>
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Dispositivo
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("name", { required: "Este campo es obligatorio" })}
          label="Nombre del dispositivo"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("location", { required: "Este campo es obligatorio" })}
          label="Ubicación"
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select
            {...register("type", { required: "Este campo es obligatorio" })}
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
          >
            <MenuItem value="Camera">Camera</MenuItem>
            <MenuItem value="Sensor">Sensor</MenuItem>
          </Select>
        </FormControl>
        <TextField
          {...register("protocol")}
          label="Protocolo"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("ipAddress")}
          label="Dirección IP"
          margin="normal"
          fullWidth
        />
        {formType === "Sensor" && (
          <>
            <TextField
              {...register("macAddress")}
              label="Dirección MAC"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("model")}
              label="Modelo"
              margin="normal"
              fullWidth
            />
          </>
        )}
        {formType === "Camera" && (
          <>
            <TextField
              {...register("firmwareVersion")}
              label="Versión del firmware"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("resolution")}
              label="Resolución"
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("streamUrl")}
              label="URL de transmisión"
              margin="normal"
              fullWidth
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenDeleteDialog}
          >
            Eliminar Dispositivo
          </Button>
        </Box>
      </form>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Selecciona el Tipo de Dispositivo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
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
            Confirmar Eliminación
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditDevice;
