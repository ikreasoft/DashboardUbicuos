import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Settings, Maximize2, Minimize2 } from "lucide-react";
import { debounce } from "lodash";

export default function SensorsPage() {
  const { user } = useAuth();
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Función para calcular el factor de escala óptimo
  const calculateScale = () => {
    if (!iframeContainerRef.current) return;

    const containerWidth = iframeContainerRef.current.offsetWidth;
    const containerHeight = iframeContainerRef.current.offsetHeight;

    // El iframe original tiene 1024x768 (dimensiones estándar)
    const originalWidth = 1024;
    const originalHeight = 768;

    // Calcular factores de escala para ancho y alto
    const scaleX = containerWidth / originalWidth;
    const scaleY = containerHeight / originalHeight;

    // Usar el factor más pequeño para mantener proporciones
    const newScale = Math.min(scaleX, scaleY);
    setScale(newScale);
  };

  // Efecto para manejar el resize
  useEffect(() => {
    const handleResize = debounce(calculateScale, 250);
    calculateScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manejar cambio de estado fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Función para alternar pantalla completa
  const toggleFullscreen = async () => {
    if (!iframeContainerRef.current) return;

    try {
      if (!isFullscreen) {
        await iframeContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error al cambiar modo pantalla completa:', error);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="flex-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sensores Zigbee2MQTT</h1>
              <p className="text-sm text-muted-foreground">
                Bienvenido, {user?.username}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                // TO-DO: Abrir configuración
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 relative">
        <div 
          ref={iframeContainerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <iframe 
            src="http://localhost:3000"
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'white',
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out'
            }}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}