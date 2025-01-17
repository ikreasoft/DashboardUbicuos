"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginLayout({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === undefined) return; // Esperar a que se resuelva el estado

    if (isAuthenticated) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  // Mostrar un estado de carga mientras se resuelve la autenticación
  if (loading) {
    return <p>Validando autenticación...</p>;
  }

  return <>{children}</>;
}
