import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { logger } from '@/lib/services/logger';

interface MQTTMessage {
  topic: string;
  payload: any;
  timestamp: Date;
}

export default function useMqtt() {
  const [sensorCount, setSensorCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [sensorMessages, setSensorMessages] = useState<MQTTMessage[]>([]);

  useEffect(() => {
    const connect = () => {
      // Usar TCP directo en lugar de WebSocket
      const mqttUrl = 'mqtt://localhost:1883';

      logger.info('Connecting to MQTT broker:', mqttUrl);

      const client = mqtt.connect(mqttUrl, {
        clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30 * 1000
      });

      client.on('connect', () => {
        logger.info('Connected to MQTT broker');
        setIsConnected(true);
        setConnectionError(null);

        // Suscribirse a todos los topics de Zigbee2MQTT
        client.subscribe('zigbee2mqtt/#', (err) => {
          if (err) {
            logger.error('Error subscribing to topics:', err);
            setConnectionError('Error al suscribirse a los tópicos');
          }
        });

        // Solicitar lista de dispositivos
        client.publish('zigbee2mqtt/bridge/request/devices', '');
      });

      client.on('message', (topic, message) => {
        try {
          const payload = JSON.parse(message.toString());

          // Si es la respuesta con la lista de dispositivos
          if (topic === 'zigbee2mqtt/bridge/devices') {
            const sensors = Array.isArray(payload) ? payload.filter((device: any) => 
              !device.friendly_name.includes('bridge') && 
              !device.friendly_name.includes('coordinator')
            ) : [];
            setSensorCount(sensors.length);
          }

          // Almacenar mensaje para otros usos
          setSensorMessages(prev => [
            ...prev.slice(-49), // Mantener solo los últimos 50 mensajes
            {
              topic,
              payload,
              timestamp: new Date()
            }
          ]);
        } catch (error) {
          logger.error('Error al procesar mensaje MQTT:', error);
        }
      });

      client.on('error', (err) => {
        logger.error('MQTT connection error:', err);
        setConnectionError(err.message);
        setIsConnected(false);
      });

      client.on('close', () => {
        logger.info('MQTT connection closed');
        setIsConnected(false);
      });

      client.on('offline', () => {
        logger.info('MQTT client is offline');
        setIsConnected(false);
      });

      return () => {
        client.end();
      };
    };

    connect();
  }, []);

  return {
    isConnected,
    connectionError,
    sensorCount,
    sensorMessages
  };
}