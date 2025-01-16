"use client";

import { Header } from "@components/header"; // Asegúrate de que este componente exista
import { ThemedLayoutV2 } from "@refinedev/mui";
import { useAuth } from "@contexts/AuthContext";
import React, { useEffect } from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirigir al login si no está autenticado
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Cargando...</p>; // Pantalla de carga mientras se valida la autenticación
  }

  return <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>;
}
