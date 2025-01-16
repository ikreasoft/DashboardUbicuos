import authOptions from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  const data = await getData();

  if (data?.session?.user) {
    // Redirigir a la página principal si ya hay una sesión activa
    return redirect("/");
  }

  // Permitir el acceso libre a cualquier página de login o registro
  return <>{children}</>;
}

async function getData() {
  try {
    // Obtener sesión del servidor usando las opciones de NextAuth
    const session = await getServerSession(authOptions);

    return {
      session,
    };
  } catch (error) {
    console.error("Error al obtener la sesión:", error);
    return {
      session: null,
    };
  }
}
