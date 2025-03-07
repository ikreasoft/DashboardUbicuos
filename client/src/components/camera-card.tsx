import { Camera, Recording } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Copy, Loader2, Trash, Edit, Check, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CameraCardProps {
  camera: Camera;
  onClone: (camera: Camera) => void;
}

export default function CameraCard({ camera, onClone }: CameraCardProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPrefixInput, setShowPrefixInput] = useState(false);
  const [prefix, setPrefix] = useState(camera.recordingPrefix || '');

  const { data: recordings } = useQuery<Recording[]>({
    queryKey: [`/api/cameras/${camera.id}/recordings`],
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiRequest("DELETE", `/api/cameras/${camera.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/cameras"] });
      toast({
        title: "Cámara eliminada",
        description: "La cámara ha sido eliminada del dashboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la cámara",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleUpdatePrefix = async () => {
    try {
      await apiRequest("PATCH", `/api/cameras/${camera.id}`, {
        recordingPrefix: prefix,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cameras"] });
      setShowPrefixInput(false);
      toast({
        title: "Prefijo actualizado",
        description: "El prefijo de grabación se ha actualizado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el prefijo de grabación",
        variant: "destructive",
      });
    }
  };

  const getSecureRtspUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.username || urlObj.password) {
        urlObj.username = '****';
        urlObj.password = '****';
      }
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  };

  const getLatestRecording = () => {
    if (!recordings || recordings.length === 0) return null;
    return recordings[0];
  };

  const latestRecording = getLatestRecording();

  // Get status indicator
  const getStatusIndicator = () => {
    const status = camera.status || 'disconnected';
    switch (status) {
      case 'connected':
        return {
          color: 'bg-green-500',
          text: 'Conectada'
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Error'
        };
      case 'connecting':
        return {
          color: 'bg-yellow-500',
          text: 'Conectando'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Desconectada'
        };
    }
  };

  const statusIndicator = getStatusIndicator();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">{camera.name}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClone(camera)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${statusIndicator.color}`} />
              <span className="text-sm font-medium">{statusIndicator.text}</span>
              {camera.isRecording && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Grabando
                </span>
              )}
            </div>

            {/* Camera Info */}
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                IP: {camera.ipAddress}
              </p>
              <p className="text-muted-foreground">
                Estado: {camera.isRecording ? "Grabando" : "Inactivo"}
              </p>
              {camera.metrics && (
                <>
                  <p className="text-muted-foreground">
                    FPS: {camera.metrics.fps}
                  </p>
                  <p className="text-muted-foreground">
                    Bitrate: {camera.metrics.bitrate} kbps
                  </p>
                </>
              )}
            </div>

            {/* Recording Prefix */}
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between"
                      onClick={() => setShowPrefixInput(true)}
                    >
                      <span className="flex items-center gap-2">
                        <span>Prefijo de grabación</span>
                        <Edit className="h-4 w-4" />
                      </span>
                      <span className="text-muted-foreground">
                        {camera.recordingPrefix || "Sin prefijo"}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>El prefijo se usa para nombrar los archivos de grabación</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {showPrefixInput && (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="flex-1"
                  placeholder="Introduce prefijo para las grabaciones..."
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="icon" onClick={handleUpdatePrefix}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Guardar prefijo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setShowPrefixInput(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancelar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            {/* RTSP URL */}
            <p className="text-sm text-muted-foreground font-mono break-all">
              RTSP: {getSecureRtspUrl(camera.rtspUrl)}
            </p>

            {/* Latest Recording Info */}
            {latestRecording && (
              <p className="text-sm text-muted-foreground">
                Última Grabación: {new Date(latestRecording.startTime).toLocaleString()}
                {latestRecording.status === "recording" && " (En progreso)"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Cámara</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar {camera.name}? Esta acción no se puede
              deshacer y eliminará todas las grabaciones.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}