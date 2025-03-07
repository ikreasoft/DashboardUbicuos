"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Definimos el tipo de datos que manejará el contexto
type AuthContextType = {
  user: any; // Aquí puedes definir un tipo más específico según tu backend
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean | undefined; // Puede ser `undefined` mientras se valida
};

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor que envuelve la aplicación
export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  // Validar el token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setIsAuthenticated(false); // No autenticado si no hay token
    }
  }, []);

  // Función para validar el token con el backend
  const validateToken = async (token: string) => {
    try {
      const response = await fetch("http://localhost:4000/users/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token inválido o expirado.");
      }

      const data = await response.json();
      setUser(data.user); // Aquí es donde se establece el usuario
      setIsAuthenticated(true); // Usuario autenticado
    } catch (error) {
      console.error("Error al validar el token:", error);
      logout(); // Si el token es inválido o expirado, cerrar sesión
    }
  };

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
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
        throw new Error(data.message || "Error al iniciar sesión.");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token); // Guardar el token en localStorage
      await validateToken(token); // Validar el token recibido
      router.push("/home"); // Redirigir al home
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error; // Permitir que los componentes manejen el error
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login"); // Redirigir al login
  };

  // Proveedor de contexto que envuelve a los hijos
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider.");
  }
  return context;
};
