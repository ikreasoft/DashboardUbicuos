import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, Video, Activity, Brain } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import useMqtt from "@/hooks/use-mqtt";

export default function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const { sensors } = useMqtt();

  // Obtener detalles de la sesión
  const { data: session } = useQuery({
    queryKey: [`/api/sessions/${id}`],
  });

  // Obtener grabaciones de la sesión
  const { data: recordings } = useQuery({
    queryKey: [`/api/sessions/${id}/recordings`],
  });

  // Obtener datos de sensores de la sesión
  const { data: sensorData } = useQuery({
    queryKey: [`/api/sessions/${id}/sensor-data`],
  });

  // Manejar la descarga del ZIP
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/sessions/${id}/download`);
      if (!response.ok) throw new Error('Error al descargar los datos');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `session-${id}-${format(new Date(), 'yyyy-MM-dd-HH-mm')}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Descarga iniciada",
        description: "Los datos se están descargando",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron descargar los datos",
        variant: "destructive",
      });
    }
  };

  // Manejar el temporizador
  useEffect(() => {
    if (!session?.duration || !session.startTime) return;

    const endTime = new Date(session.startTime).getTime() + (session.duration * 1000);
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);

    if (remaining > 0) {
      setIsActive(true);
      setTimeLeft(remaining);

      const timer = setInterval(() => {
        const newRemaining = Math.max(0, endTime - Date.now());
        if (newRemaining <= 0) {
          clearInterval(timer);
          setIsActive(false);
          setTimeLeft(0);
        } else {
          setTimeLeft(newRemaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [session]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Detalles de Sesión #{id}
        </h1>
        <div className="flex items-center gap-4">
          {isActive && timeLeft !== null && (
            <div className="flex items-center gap-2 text-orange-500">
              <Clock className="h-5 w-5" />
              <span className="font-mono">
                {Math.floor(timeLeft / 60000)}:{String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')}
              </span>
            </div>
          )}
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Descargar Datos (ZIP)
          </Button>
        </div>
      </div>

      {/* Videos Grabados */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="h-5 w-5" />
          Videos Grabados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recordings?.map((recording: any) => (
            <Card key={recording.id}>
              <CardContent className="p-4">
                <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                  <img
                    src={`/api/recordings/${recording.id}/thumbnail`}
                    alt={`Recording ${recording.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <p className="font-medium">{recording.cameraName || `Cámara ${recording.cameraId}`}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(recording.startTime), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Datos de Sensores */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Datos de Sensores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorData?.map((sensor: any) => (
            <Card key={sensor.ieee_addr}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{sensor.friendly_name}</h3>
                <pre className="text-xs bg-muted p-2 rounded-lg overflow-auto max-h-40">
                  {typeof sensor.data === 'object' ? JSON.stringify(sensor.data, null, 2) : sensor.data}
                </pre>
                <div className="mt-2 text-sm text-muted-foreground">
                  Última actualización: {format(new Date(sensor.timestamp), 'HH:mm:ss')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}