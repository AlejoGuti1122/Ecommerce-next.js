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

interface AuthContextType {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
  user: Iuser | null
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
  saveUserData: (data: { user: Iuser; token: string }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<Iuser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  //Funcion donde guardo los datos del usuario que me devuelve el login
  const saveUserData = (data: { user: Iuser; token: string }) => {
    setUser(data.user)
    setAuthenticated(true)
    setToken(data.token)

    // persistir datos en localStorage
    localStorage.setItem("user", JSON.stringify(data))
  }

  const logout = useCallback(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    setAuthenticated(false)
    setUser(null)
    setToken(null)
    router.push("/login")
  }, [router])

  useEffect(() => {
    // Lógica para persistir los datos
    const storage = JSON.parse(localStorage.getItem("user") || "{}")
    console.log("user", storage)

    // Validar si los datos existen o están vacíos
    if (storage === undefined || !Object.keys(storage)?.length) {
      setAuthenticated(false)
      setUser(null)
      setToken(null)
      return
    }

    // Restaurar los datos desde el almacenamiento
    const storageType = storage as any
    setUser(storageType.user)
    setAuthenticated(true)
    setToken(storageType.token)
  }, [])

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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
