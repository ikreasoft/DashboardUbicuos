import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Camera } from "@shared/schema";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useMqtt from "@/hooks/use-mqtt";
import { SessionConfigDialog } from "@/components/session-config-dialog";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const { sensorCount } = useMqtt();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const { data: cameras, isLoading: camerasLoading } = useQuery<Camera[]>({
    queryKey: ["/api/cameras"],
  });

  const { data: recordingsCount } = useQuery<number>({
    queryKey: ["/api/recordings/count"],
  });

  if (camerasLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Panel de Control</h1>
              <p className="text-sm text-muted-foreground">
                Bienvenido, {user?.username}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Cámaras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{cameras?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Cámaras registradas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesiones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{recordingsCount || 0}</p>
                <p className="text-sm text-muted-foreground">Sesiones grabadas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sensores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{sensorCount || 0}</p>
                <p className="text-sm text-muted-foreground">Sensores conectados</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Configuración de Sesión</h2>
          <Card>
            <CardContent className="py-6">
              <p className="text-muted-foreground mb-4">
                Configure los dispositivos y parámetros para la próxima sesión de monitoreo
              </p>
              <Button onClick={() => setIsConfigOpen(true)}>
                Configurar Dispositivos
              </Button>
            </CardContent>
          </Card>
        </div>

        <SessionConfigDialog 
          open={isConfigOpen}
          onOpenChange={setIsConfigOpen}
        />
      </main>
    </div>
  );
}