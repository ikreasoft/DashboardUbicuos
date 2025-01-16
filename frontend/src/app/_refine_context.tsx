"use client";

import {
  GitHubBanner,
  Refine,
  type AuthProvider,
  OnErrorResponse,
} from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";

type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return <App {...props} />;
};

type AppProps = {
  defaultMode?: string;
};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const currentPath = usePathname();

  const authProvider: AuthProvider = {
    login: async ({ username, password }: { username: string; password: string }) => {
      try {
        const response = await fetch("http://localhost:4000/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Usuario o contraseña inválidos.");
        }

        const { token } = await response.json();

        // Almacenar el token en localStorage
        localStorage.setItem("token", token);

        console.log("Inicio de sesión exitoso. Redirigiendo al home...");
        return {
          success: true,
          redirectTo: "/home", // Redirigir a la página principal tras login exitoso
        };
      } catch (error) {
        console.error("Error al iniciar sesión:", error);

        return {
          success: false,
          error: error instanceof Error ? error : new Error("Error al iniciar sesión"),
        };
      }
    },

    logout: async () => {
      localStorage.removeItem("token");
      console.log("Sesión cerrada. Redirigiendo al login...");

      return {
        success: true,
        redirectTo: "/login", // Redirigir al login tras logout
      };
    },

    check: async () => {
      const token = localStorage.getItem("token");
      console.log("Token encontrado en localStorage:", token);
    
      if (!token) {
        console.warn("No se encontró un token. Redirigiendo al login.");
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    
      try {
        const response = await fetch("http://localhost:4000/users/validate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          console.warn("Token inválido o expirado. Redirigiendo al login.");
          return {
            authenticated: false,
            redirectTo: "/login",
          };
        }
    
        const data = await response.json();
        console.log("Token válido. Permitiendo acceso:", data);
        return { authenticated: true };
      } catch (error) {
        console.error("Error al validar el token:", error);
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    },
    
    getPermissions: async () => {
      return null; // Manejo de permisos basado en roles (opcional)
    },

    getIdentity: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          return {
            id: payload.id,
            username: payload.username,
            role: payload.role,
          };
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          return null;
        }
      }
      return null;
    },

    onError: (error: any): Promise<OnErrorResponse> => {
      console.error("Error en AuthProvider:", error);

      return Promise.resolve({
        error: new Error("Error en el AuthProvider"),
      });
    },
  };

  const defaultMode = props?.defaultMode;

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "home",
                  list: "/home",
                },
                {
                  name: "devices",
                  list: "/devices",
                  create: "/devices/create",
                  edit: "/devices/edit/:id",
                  show: "/devices/show/:id",
                  meta: { canDelete: true },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {props.children}
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
