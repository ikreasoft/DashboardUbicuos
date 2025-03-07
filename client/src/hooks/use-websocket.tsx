import { useEffect, useRef } from "react";
import { queryClient } from "@/lib/queryClient";
import { Camera } from "@shared/schema";

type WebSocketMessage = {
  type: "camera_added" | "camera_updated" | "camera_deleted";
  camera?: Camera;
  cameraId?: number;
};

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        switch (message.type) {
          case "camera_added":
          case "camera_updated":
          case "camera_deleted":
            queryClient.invalidateQueries({ queryKey: ["/api/cameras"] });
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return socketRef.current;
}
