import { DataProvider, BaseRecord, DeleteOneParams, DeleteOneResponse } from "@refinedev/core";

const API_URL = "http://localhost:4000";

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const response = await fetch(`${API_URL}/devices/${resource}`);
    const data = await response.json();

    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/devices/${resource}/${id}`);
    const data = await response.json();

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    console.log("Intentando crear recurso:", resource, variables);
    const response = await fetch(`${API_URL}/devices/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });

    console.log("Respuesta del servidor:", response.status, await response.text());

    if (!response.ok) {
      throw new Error(`Error al crear el recurso ${resource}`);
    }

    const data = await response.json();
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/devices/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el recurso ${resource}`);
    }

    const data = await response.json();
    return {
      data,
    };
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    id,
  }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
    const url = `${API_URL}/devices/${resource}/${id}`;
    console.log("Intentando eliminar recurso desde URL:", url);

    const response = await fetch(url, {
      method: "DELETE",
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
  },

  getApiUrl: () => API_URL, // Devuelve la URL base de tu API
};
