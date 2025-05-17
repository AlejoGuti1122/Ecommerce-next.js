"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Iuser } from "@/interfaces"; // Importa la interfaz Iuser

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  user: Iuser | null; // Usa la interfaz Iuser
  setUser: (user: Iuser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<Iuser | null>(null); // Usa la interfaz Iuser

  // Recupera el token y los datos del usuario al cargar la aplicación
  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Recupera los datos del usuario desde localStorage
    } else {
      setAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("authToken"); // Elimina el token de las cookies
    localStorage.removeItem("user"); // Elimina los datos del usuario de localStorage
    setAuthenticated(false); // Limpia el estado global
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};