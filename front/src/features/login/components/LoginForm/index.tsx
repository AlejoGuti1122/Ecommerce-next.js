// components/LoginForm.tsx
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useAuth } from "@/context/authContext"
import { postLogin } from "@/services/service-auth"
import usePublic from "@/hooks/usePublic"

export interface ILoginInput {
  email: string
  password: string
}

// Componente de formulario para iniciar sesión
export default function LoginForm() {
  usePublic() // Hook personalizado que probablemente redirige al usuario si ya está autenticado

  const router = useRouter() // Hook de Next.js para redireccionar programáticamente
  const { saveUserData } = useAuth() // Se obtiene del contexto de autenticación la función para guardar los datos del usuario

  // Estado local que guarda los valores del formulario: email y contraseña
  const [formData, setFormData] = useState<ILoginInput>({
    email: "",
    password: "",
  })

  // Estado para manejar mensajes de error en el formulario
  const [error, setError] = useState("")

  // Función que se ejecuta cada vez que el usuario escribe en un input
  // Actualiza el estado 'formData' manteniendo los demás valores intactos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario

    const { email, password } = formData

    // Validación simple: si algún campo está vacío, se muestra un error
    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      // Se envían los datos al backend para hacer login
      const data = await postLogin(formData)

      // Se guardan los datos del usuario (por ejemplo, token e info del perfil)
      saveUserData(data)

      // Se muestra un mensaje de éxito
      toast.success("¡Inicio de sesión exitoso!")

      // Se redirige al usuario a la página principal
      router.push("/")
    } catch (e) {
      // Si ocurre un error en el login (credenciales inválidas, error de servidor, etc.)
      console.error("Error al iniciar sesión:", e)
      toast.error("Error al iniciar sesión. Verifica tus credenciales.")
    }
  }

  // Renderiza el formulario con campos para email y contraseña
  // Si hay un error, se muestra debajo de los inputs
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="w-full p-2 rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full p-2 rounded"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Iniciar sesión
      </button>
    </form>
  )
}
