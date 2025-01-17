import {
  DataProvider,
  BaseRecord,
  DeleteOneParams,
  DeleteOneResponse,
} from "@refinedev/core";

const API_URL = "http://localhost:4000";

// Función para obtener el token de autenticación desde el localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Agregar encabezados con autenticación
const withAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
};

// Proveedor de datos
export const dataProvider: DataProvider = {
  // Obtener lista de recursos
  getList: async ({ resource }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}`, {
        headers: withAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al obtener la lista de ${resource}: ${errorText}`
        );
      }

      const data = await response.json();
      return {
        data,
        total: data.length,
      };
    } catch (error) {
      console.error("Error en getList:", error);
      throw error;
    }
  },

  // Obtener un recurso específico
  getOne: async ({ resource, id }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        headers: withAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al obtener el recurso ${resource} con ID ${id}: ${errorText}`
        );
      }

      const data = await response.json();
      return {
        data,
      };
    } catch (error) {
      console.error("Error en getOne:", error);
      throw error;
    }
  },

  // Crear un recurso
  create: async ({ resource, variables }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}`, {
        method: "POST",
        headers: withAuthHeaders(),
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al crear el recurso ${resource}: ${errorText}`
        );
      }

      const data = await response.json();
      return {
        data,
      };
    } catch (error) {
      console.error("Error en create:", error);
      throw error;
    }
  },

  // Actualizar un recurso
  update: async ({ resource, id, variables }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PATCH",
        headers: withAuthHeaders(),
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al actualizar el recurso ${resource} con ID ${id}: ${errorText}`
        );
      }

      const data = await response.json();
      return {
        data,
      };
    } catch (error) {
      console.error("Error en update:", error);
      throw error;
    }
  },

  // Eliminar un recurso
  deleteOne: async <
    TData extends BaseRecord = BaseRecord,
    TVariables = {}
  >({
    resource,
    id,
  }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
    const url = `${API_URL}/${resource}/${id}`;
    console.log("Intentando eliminar recurso desde URL:", url);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: withAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error al eliminar el recurso ${resource}`);
      }

      const deletedRecord = await response.json();
      return {
        data: deletedRecord as TData,
      };
    } catch (error) {
      console.error("Error en deleteOne:", error);
      throw error;
    }
  },

  // Obtener la URL base de la API
  getApiUrl: () => API_URL,
};
