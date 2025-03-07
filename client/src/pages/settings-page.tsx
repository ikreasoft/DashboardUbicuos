import { useQuery, useMutation } from "@tanstack/react-query";
import { Camera, UserRole } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, User, Shield, Bell } from "lucide-react";
import { logger } from "@/lib/services/logger";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type UserPreferences = {
  notifications: boolean;
  darkMode: boolean;
  language: string;
};

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: cameras } = useQuery<Camera[]>({
    queryKey: ["/api/cameras"],
  });

  const form = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      preferences: user?.preferences as UserPreferences || {
        notifications: true,
        darkMode: false,
        language: "es"
      }
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", "/api/user/preferences", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuración actualizada",
        description: "Los cambios se han guardado correctamente"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    }
  });

  const handleRefreshCameras = () => {
    logger.info("Refreshing camera connections");
    toast({
      title: "Reconectando cámaras",
      description: "Intentando restablecer conexiones..."
    });
    // TODO: Implementar reconexión de cámaras
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Perfil de Usuario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil de Usuario
            </CardTitle>
            <CardDescription>
              Gestiona tu información personal y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(data => updateUserMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Preferencias
                  </h3>

                  <FormField
                    control={form.control}
                    name="preferences.notifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Notificaciones</FormLabel>
                          <FormDescription>
                            Recibir alertas del sistema
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences.darkMode"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Modo oscuro</FormLabel>
                          <FormDescription>
                            Cambiar apariencia de la interfaz
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Guardar cambios
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Permisos y Rol */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permisos y Rol
            </CardTitle>
            <CardDescription>
              Nivel de acceso: {user?.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                {user?.role === UserRole.ADMIN && "Acceso completo al sistema"}
                {user?.role === UserRole.OPERATOR && "Gestión de cámaras y grabaciones"}
                {user?.role === UserRole.VIEWER && "Visualización de contenido"}
              </p>
              {user?.role === UserRole.ADMIN && (
                <Button variant="outline" className="w-full">
                  Gestionar roles de usuarios
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Sistema
            </CardTitle>
            <CardDescription>
              Ajustes generales del sistema de cámaras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Estado de las Cámaras</h3>
                  <p className="text-sm text-muted-foreground">
                    {cameras?.length || 0} cámaras configuradas
                  </p>
                </div>
                <Button onClick={handleRefreshCameras} variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reconectar
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Directorio de Grabaciones</h3>
                  <p className="text-sm text-muted-foreground">
                    /recordings
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configurar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}