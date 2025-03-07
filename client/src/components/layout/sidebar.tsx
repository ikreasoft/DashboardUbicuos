import { Link, useLocation } from "wouter";
import { 
  Home, 
  Video, 
  Play, 
  Settings, 
  Thermometer,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LogOut } from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Camera, label: "Cámaras", href: "/cameras" },
  { icon: Video, label: "Sesiones", href: "/sessions" },
  { icon: Play, label: "Live Now", href: "/player" },
  { icon: Thermometer, label: "Sensores", href: "/sensors" },
  { icon: Settings, label: "Ajustes", href: "/settings" },
] as const;

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 bg-card/50 backdrop-blur-xl border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Sistema de Monitoreo
        </h2>
      </div>
      <nav className="flex-1 px-3 space-y-1.5">
        {navigationItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 transition-all",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t space-y-4">
        <div className="text-sm text-muted-foreground">
          Bienvenido, {user?.username}
        </div>
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Cerrar Sesión
        </Button>
        <p className="text-xs text-muted-foreground">
          Sistema de Monitoreo v1.2
        </p>
      </div>
    </div>
  );
}