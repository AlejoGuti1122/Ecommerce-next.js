"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

interface AuthContextType {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  // Verifica si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = Cookies.get("authToken")
    setAuthenticated(!!token) // Si hay un token, el usuario está autenticado
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
