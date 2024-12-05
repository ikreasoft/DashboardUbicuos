// src/interfaces/sensor.ts

export interface SensorData {
    _id: string;
    name: string;
    type: string;
    location: string;
    ipAddress: string;
    macAddress?: string; // Opcional
    firmwareVersion: string;
    lastConnection: string;
    isActive: boolean;
    resolution?: string; // Opcional
    configuration?: {
      sensitivity: number;
      lifetime: number;
      maxTemperature: number;
    }; // Opcional
  }
  