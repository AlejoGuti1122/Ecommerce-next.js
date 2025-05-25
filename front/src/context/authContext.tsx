"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import { useRouter } from "next/navigation"
import { Iuser } from "@/interfaces"

// Definimos la forma que tendrá nuestro contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean // Indica si el usuario está autenticado o no
  setAuthenticated: (value: boolean) => void // Función para cambiar el estado de autenticación
  user: Iuser | null // Datos del usuario autenticado o null si no hay usuario
  token: string | null // Token de autenticación o null si no hay token
  setToken: (token: string | null) => void // Función para cambiar el token
  logout: () => void // Función para cerrar sesión
  saveUserData: (data: { user: Iuser; token: string }) => void // Función para guardar datos del usuario y token al iniciar sesión
}

// Creamos el contexto con valor inicial undefined, para forzar su uso dentro del proveedor
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente proveedor que envuelve la aplicación para compartir el estado de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado que indica si el usuario está autenticado o no
  const [isAuthenticated, setAuthenticated] = useState(false)

  // Estado donde guardamos la información del usuario actual
  const [user, setUser] = useState<Iuser | null>(null)

  // Estado para guardar el token de autenticación
  const [token, setToken] = useState<string | null>(null)

  // Hook de Next.js para redireccionar rutas
  const router = useRouter()

  /**
   * Función para guardar los datos del usuario y token que recibimos después del login
   * Actualiza los estados y también persiste la información en localStorage para mantener la sesión
   */
  const saveUserData = (data: { user: Iuser; token: string }) => {
    setUser(data.user)
    setAuthenticated(true)
    setToken(data.token)

    // Guardamos el objeto completo en localStorage para restaurarlo después
    localStorage.setItem("user", JSON.stringify(data))
  }

  /**
   * Función para cerrar sesión
   * Elimina los datos almacenados en localStorage y limpia los estados
   * Finalmente redirige al usuario a la página de login
   * useCallback para memorizar la función y evitar recreaciones innecesarias
   */
  const logout = useCallback(() => {
    localStorage.removeItem("authToken") // Limpiamos token (si lo usas separado)
    localStorage.removeItem("user") // Eliminamos datos del usuario
    localStorage.removeItem("cart") // Limpiamos carrito si usas uno en la app

    setAuthenticated(false) // Marcamos que no hay usuario autenticado
    setUser(null) // Limpiamos datos del usuario
    setToken(null) // Limpiamos token

    router.push("/login") // Redirigimos a login
  }, [router])

  /**
   * useEffect que se ejecuta al montar el componente
   * Intenta restaurar la sesión leyendo datos del localStorage
   * Si los datos existen, los carga al estado
   * Si no existen, deja la sesión como no autenticada
   */
  useEffect(() => {
    // Obtenemos el objeto almacenado en localStorage
    const storage = JSON.parse(localStorage.getItem("user") || "{}")
    console.log("user", storage)

    // Validamos si el objeto está vacío o indefinido
    if (storage === undefined || !Object.keys(storage)?.length) {
      setAuthenticated(false) // No autenticado
      setUser(null) // Sin usuario
      setToken(null) // Sin token
      return
    }

    // Si hay datos, los restauramos al estado
    const storageType = storage as any
    setUser(storageType.user)
    setAuthenticated(true)
    setToken(storageType.token)
  }, [])

  // Retornamos el proveedor con todos los valores y funciones que queremos compartir
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        user,
        saveUserData,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personalizado para consumir el contexto de autenticación
 * Lanza un error si se intenta usar fuera del proveedor
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
