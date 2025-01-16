import { DataProvider, BaseRecord, DeleteOneParams, DeleteOneResponse } from "@refinedev/core";

const API_URL = "http://localhost:4000";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const withAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
};

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      headers: withAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener la lista de ${resource}`);
    }

    const data = await response.json();
    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      headers: withAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el recurso ${resource} con ID ${id}`);
    }

    const data = await response.json();
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: withAuthHeaders(),
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear el recurso ${resource}: ${errorText}`);
    }

    const data = await response.json();
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      headers: withAuthHeaders(),
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar el recurso ${resource} con ID ${id}: ${errorText}`);
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
    const url = `${API_URL}/${resource}/${id}`;
    console.log("Intentando eliminar recurso desde URL:", url);

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
  },

  getApiUrl: () => API_URL,
};
