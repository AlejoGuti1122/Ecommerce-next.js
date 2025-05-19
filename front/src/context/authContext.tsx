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
  setUser: (user: Iuser | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<Iuser | null>(null)
  const router = useRouter()

  const logout = useCallback(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    setAuthenticated(false)
    setUser(null)
    router.push("/login")
  }, [router])

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser)

        // Filtra los datos del usuario para asegurarte de que coincidan con la interfaz Iuser
        const filteredUser: Iuser = {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          role: user.role,
          orders: user.orders,
        }

        setAuthenticated(true)
        setUser(filteredUser)
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        setAuthenticated(false)
        setUser(null)
        router.push("/login")
      }
    } else {
      setAuthenticated(false)
      setUser(null)
    }
  }, [router])
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, user, setUser, logout }}
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
