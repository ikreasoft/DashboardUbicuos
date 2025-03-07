import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { logger } from '@/lib/services/logger';

export default function useMqtt() {
  const [sensorCount, setSensorCount] = useState(0);
  const [sensors, setSensors] = useState<any[]>([]);

  useEffect(() => {
    const connect = () => {
      // Usar WebSocket para conexión desde el navegador
      const client = mqtt.connect('ws://localhost:9001', {
        clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30 * 1000
      });

      client.on('connect', () => {
        logger.info('Connected to MQTT broker');

        // Suscribirse a la lista de dispositivos
        client.subscribe('zigbee2mqtt/bridge/devices', (err) => {
          if (err) {
            logger.error('Error subscribing to devices topic:', err);
          }
        });

        // Solicitar lista de dispositivos
        client.publish('zigbee2mqtt/bridge/request/devices', '');
      });

      client.on('message', (topic, message) => {
        try {
          if (topic === 'zigbee2mqtt/bridge/devices') {
            const payload = JSON.parse(message.toString());
            // Contar sensores excluyendo bridge y coordinator
            const filteredSensors = Object.values(payload).filter((device: any) => 
              !device.friendly_name.includes('bridge') && 
              !device.friendly_name.includes('coordinator')
            );
            setSensorCount(filteredSensors.length);
            setSensors(filteredSensors);
          }
        } catch (error) {
          logger.error('Error processing MQTT message:', error);
        }
      });

      return () => {
        client.end();
      };
    };

    connect();
  }, []);

  return {
    sensorCount,
    sensors
  };
}