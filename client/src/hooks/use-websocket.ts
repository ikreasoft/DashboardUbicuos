import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";
import { logger } from "@/lib/services/logger";

export function useWebSocket() {
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectAttempt = 0;
    let reconnectTimeout: NodeJS.Timeout;

    function connect() {
      try {
        // Usar el host actual para la conexión WebSocket
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/ws`;

        logger.info("Connecting to WebSocket", { url: wsUrl });
        ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            logger.info("WebSocket message received", { message });

            if (message.type === 'metrics') {
              queryClient.setQueryData(['metrics'], {
                fps: parseFloat(message.fps) || 0,
                bitrate: parseFloat(message.bitrate) || 0,
                recordingTime: message.time || "00:00:00",
                lastSave: message.lastSave || "-"
              });
            }
          } catch (error) {
            logger.error("Error processing WebSocket message", { 
              error: error instanceof Error ? error.message : 'Unknown error',
              data: event.data
            });
          }
        };

        ws.onopen = () => {
          logger.info("WebSocket connected");
          reconnectAttempt = 0;
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
          }
        };

        ws.onerror = (error) => {
          logger.error("WebSocket error occurred", { 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        };

        ws.onclose = () => {
          logger.info("WebSocket disconnected");
          ws = null;

          // Incrementar el tiempo de espera exponencialmente
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempt), 30000);
          reconnectAttempt++;

          reconnectTimeout = setTimeout(connect, delay);
        };
      } catch (error) {
        logger.error("Error creating WebSocket connection", { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        ws = null;
        reconnectTimeout = setTimeout(connect, 3000);
      }
    }

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);
}