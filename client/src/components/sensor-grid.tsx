import { Sensor } from "@shared/schema";
import SensorCard from "./sensor-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SensorGridProps {
  sensors: Sensor[];
  onAddSensor?: () => void;
}

export default function SensorGrid({ sensors, onAddSensor }: SensorGridProps) {
  return (
    <div className="space-y-6">
      {onAddSensor && (
        <div className="flex justify-end">
          <Button
            onClick={onAddSensor}
            className="flex items-center gap-2 px-4 py-2"
            size="lg"
          >
            <Plus className="w-4 h-4" />
            Añadir Sensor
          </Button>
        </div>
      )}

      {sensors.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No hay sensores configurados</h2>
          <p className="text-muted-foreground mt-2">
            Añade un sensor Zigbee2MQTT para comenzar el monitoreo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor) => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      )}
    </div>
  );
}