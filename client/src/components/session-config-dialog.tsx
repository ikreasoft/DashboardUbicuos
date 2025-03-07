import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useMqtt from '@/hooks/use-mqtt';
import { useQuery } from '@tanstack/react-query';

interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'camera';
}

export function SessionConfigDialog({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { sensorMessages } = useMqtt();
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  // Obtener cámaras del backend
  const { data: cameras = [] } = useQuery({
    queryKey: ['/api/cameras'],
  });

  // Extraer sensores únicos de los mensajes MQTT
  const sensors = Array.from(new Set(
    sensorMessages
      .map(msg => msg.topic.replace('zigbee2mqtt/', ''))
      .filter(name => !name.includes('bridge'))
  )).map(name => ({
    id: name,
    name,
    type: 'sensor' as const
  }));

  // Combinar dispositivos
  const devices: Device[] = [
    ...sensors,
    ...cameras.map((cam: any) => ({
      id: cam.id,
      name: cam.name,
      type: 'camera' as const
    }))
  ];

  const handleDeviceToggle = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSave = () => {
    // TO-DO: Guardar configuración de sesión
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configuración de Sesión</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium">Sensores</h4>
              {sensors.map((device) => (
                <div key={device.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={device.id}
                    checked={selectedDevices.includes(device.id)}
                    onCheckedChange={() => handleDeviceToggle(device.id)}
                  />
                  <label htmlFor={device.id}>{device.name}</label>
                </div>
              ))}
            </div>
            <div>
              <h4 className="mb-2 font-medium">Cámaras</h4>
              {cameras.map((camera: any) => (
                <div key={camera.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={camera.id}
                    checked={selectedDevices.includes(camera.id)}
                    onCheckedChange={() => handleDeviceToggle(camera.id)}
                  />
                  <label htmlFor={camera.id}>{camera.name}</label>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar Configuración
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
