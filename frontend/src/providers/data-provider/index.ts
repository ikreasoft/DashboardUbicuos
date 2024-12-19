export const fetchSessionData = async (sessionId: string) => {
  const API_URL = `http://localhost:4000/sessions/data/${sessionId}`;
  console.log("API_URL utilizada para la solicitud:", API_URL); // Log para verificar la URL

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener los datos de la sesión. Código: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos de la sesión:", error);
    throw error;
  }
};
