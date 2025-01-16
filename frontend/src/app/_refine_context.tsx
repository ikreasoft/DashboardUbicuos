"use client";

import { GitHubBanner, Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import routerProvider from "@refinedev/nextjs-router";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";

type RefineContextProps = {
  defaultMode?: string;
};

const clientId = "TU_CLIENT_ID_DE_GOOGLE"; // Reemplaza esto con tu Client ID de Google

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SessionProvider>
        <App {...props} />
      </SessionProvider>
    </GoogleOAuthProvider>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const currentPath = usePathname();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      signIn("google", {
        callbackUrl: currentPath ? currentPath.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      // Permitir acceso a "/register" incluso si no hay sesión
      if (currentPath === "/register") {
        return { authenticated: true };
      }

      // Bloquear el resto de las rutas si no hay sesión activa
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return { authenticated: true };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
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
