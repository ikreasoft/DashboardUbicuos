import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqtt = () => {
  const [sensorMessages, setSensorMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  
  // Configuración de conexión
  const MQTT_BROKER = "ws://localhost:9001"; // WebSockets principal
  const MQTT_FALLBACK = "ws://127.0.0.1:9001"; // WebSockets fallback

  useEffect(() => {
    // Opciones de conexión mejoradas
    const options = {
      keepalive: 60,
      clientId: `zigbee_monitor_${Math.random().toString(16).substr(2, 8)}`,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 3000,
      connectTimeout: 30 * 1000,
      rejectUnauthorized: false
    };

    let client;
    
    try {
      console.log("📡 Intentando conectar a MQTT...");
      client = mqtt.connect(MQTT_BROKER, options);
      
      client.on("connect", () => {
        console.log("✅ Conectado a MQTT por WebSockets");
        setIsConnected(true);
        setConnectionError(null);
        
        // Intentamos suscribirnos a todos los tópicos relevantes
        client.subscribe(["zigbee2mqtt/#", "bridge/#"], (err) => {
          if (err) {
            console.error("❌ Error al suscribirse:", err);
            setConnectionError("Error al suscribirse a los tópicos");
          } else {
            console.log("✅ Suscrito a tópicos zigbee2mqtt/# y bridge/#");
          }
        });
      });

      client.on("message", (topic, message) => {
        try {
          // Intentamos parsear el mensaje como JSON
          const payload = JSON.parse(message.toString());
          console.log(`📨 Mensaje en ${topic}:`, payload);
          
          // Determinar el valor de contacto (abierto/cerrado)
          let contact = null;
          if (typeof payload.contact === 'boolean') {
            contact = payload.contact ? 0 : 1;
          } else if (payload.contact === 'on' || payload.contact === 'open') {
            contact = 1;
          } else if (payload.contact === 'off' || payload.contact === 'closed') {
            contact = 0;
          }
          
          // Solo añadir mensajes con datos relevantes
          setSensorMessages((prev) => [
            ...prev,
            { 
              topic, 
              payload: {
                ...payload,
                // Asegurarse de que contact siempre tiene un valor
                contact: contact !== null ? contact : (payload.contact || 0),
                battery: payload.battery || 0,
                linkquality: payload.linkquality || 0
              }, 
              timestamp: new Date() 
            },
          ]);
        } catch (err) {
          // Si no es JSON válido, lo registramos como string
          console.log(`📨 Mensaje no-JSON en ${topic}:`, message.toString());
        }
      });

      client.on("error", (err) => {
        console.error("❌ Error de conexión MQTT:", err);
        setConnectionError(`Error de conexión: ${err.message}`);
        setIsConnected(false);
        
        // Intentar con la conexión de fallback
        if (client.options.href === MQTT_BROKER) {
          console.log("🔄 Intentando con conexión de fallback...");
          client.end(true);
          client = mqtt.connect(MQTT_FALLBACK, options);
        }
      });

      client.on("offline", () => {
        console.warn("⚠️ Cliente MQTT desconectado");
        setIsConnected(false);
      });

      client.on("reconnect", () => {
        console.log("🔄 Intentando reconectar a MQTT...");
      });
    } catch (error) {
      console.error("❌ Error al inicializar cliente MQTT:", error);
      setConnectionError(`Error al inicializar: ${error.message}`);
    }

    // Limpieza al desmontar
    return () => {
      if (client) {
        console.log("🛑 Cerrando conexión MQTT");
        client.end();
      }
    };
  }, []);

  return { sensorMessages, isConnected, connectionError };
};

export default useMqtt;