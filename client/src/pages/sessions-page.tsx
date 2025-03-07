import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Recording, Camera, Sensor } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Play, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SessionsPage() {
  const { data: recordings, isLoading: recordingsLoading } = useQuery<Recording[]>({
    queryKey: ["/api/recordings"],
  });

  const { data: cameras } = useQuery<Camera[]>({
    queryKey: ["/api/cameras"],
  });

  const { data: sensors } = useQuery<Sensor[]>({
    queryKey: ["/api/sensors"],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [isStarting, setIsStarting] = useState(false);

  const startAllDevices = async () => {
    if (isStarting) return;

    setIsStarting(true);
    try {
      // Verificar que hay dispositivos disponibles
      if (!cameras?.length && !sensors?.length) {
        throw new Error('No hay dispositivos disponibles para iniciar la sesión');
      }

      // Crear una nueva sesión con los dispositivos seleccionados
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: sessionDuration,
          devices: {
            cameras: cameras?.map(c => ({
              id: c.id,
              prefix: c.recordingPrefix || `cam${c.id}`
            })) || [],
            sensors: sensors?.map(s => s.id) || []
          }
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear la sesión');
      }

      const session = await response.json();

      // Iniciar la grabación
      await fetch(`/api/sessions/${session.id}/start`, {
        method: 'POST'
      });

      // Actualizar la lista de grabaciones
      await queryClient.invalidateQueries({ queryKey: ["/api/recordings"] });

      toast({
        title: "Sesión iniciada",
        description: "La grabación y captura de datos ha comenzado",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo iniciar la sesión",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  const downloadSessionData = async (sessionId: number) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/download`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error al descargar: ${response.statusText}`);
      }

      const blob = await response.blob();
      const filename = `session-${sessionId}-${format(new Date(), 'yyyy-MM-dd-HH-mm')}.zip`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron descargar los datos de la sesión",
        variant: "destructive",
      });
    }
  };

  if (recordingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-[1600px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sesiones de Monitoreo</h1>
        <div className="flex items-center gap-4">
          <Select 
            value={sessionDuration.toString()} 
            onValueChange={(value) => setSessionDuration(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Duración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sin límite</SelectItem>
              <SelectItem value="300">5 minutos</SelectItem>
              <SelectItem value="600">10 minutos</SelectItem>
              <SelectItem value="1800">30 minutos</SelectItem>
              <SelectItem value="3600">1 hora</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={startAllDevices}
            disabled={isStarting || (!cameras?.length && !sensors?.length)}
          >
            {isStarting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Start All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {recordings?.map((recording) => (
          <Card key={recording.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  {recording.title || `Sesión ${recording.id}`}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(recording.startTime), "PPpp")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadSessionData(recording.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}