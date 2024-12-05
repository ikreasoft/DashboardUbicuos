"use client";

import { SensorData } from "@/interfaces/sensor";

const API_URL = "http://localhost:4000"; // Cambia según la configuración de tu API

export const fetchSessionData = async (
  sessionId: string
): Promise<SensorData[]> => {
  let allData: SensorData[] = [];
  let currentPage = 1;
  const pageSize = 1000;

  try {
    while (true) {
      const response = await fetch(
        `${API_URL}/sessions/data/${sessionId}?page=${currentPage}&size=${pageSize}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: SensorData[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      allData = [...allData, ...data];

      if (data.length < pageSize) {
        break; // Si la cantidad de datos es menor que `pageSize`, salimos del bucle
      }

      currentPage++; // Avanza a la siguiente página
    }
  } catch (error: any) {
    console.error("Error fetching session data:", error.message || error);
    return []; // Devuelve un array vacío en caso de error
  }

  return allData;
};
