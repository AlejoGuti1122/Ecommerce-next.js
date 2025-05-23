"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { useAuth } from "@/context/authContext" // Importa el contexto de autenticación
import { postLogin } from "@/services/service-auth"
import usePublic from "@/hooks/usePublic"

// Interfaz para los datos del formulario de login
export interface ILoginInput {
  email: string
  password: string
}

export default function LoginPage() {
  //Proteccion de rutas
  usePublic()

  const router = useRouter()
  const { saveUserData } = useAuth() // Accede a setUser desde el contexto
  const [formData, setFormData] = useState<ILoginInput>({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("formData a enviar:", formData)
    const { email, password } = formData

    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      const data = await postLogin(formData)
      saveUserData(data) // Guarda los datos del usuario en el contexto
      toast.success("¡Inicio de sesión exitoso!")
      router.push("/") // Redirige al home o dashboard
    } catch (e) {
      console.error("Error al iniciar sesión:", e)
      toast.error("Error al iniciar sesión. Verifica tus credenciales.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
