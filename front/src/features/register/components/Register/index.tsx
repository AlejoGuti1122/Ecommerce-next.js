"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { postRegister } from "@/services/service-auth"

export interface IRegistrationForm {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

const RegisterPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<IRegistrationForm>({
    // name: "",
    // email: "",
    // password: "",
    // address: "",
    // phone: "",

    name: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    password: "Segura123!",
    address: "Av. Siempre Viva 742, Springfield",
    phone: "3456789017",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (data: IRegistrationForm) => {
    try {
      await postRegister(data)

      // Mostrar notificación de éxito
      toast.success("¡Registro exitoso!😁🎉😎🫡😌")
      setError("")

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (e) {
      console.error("Error al registrar el usuario:", e)

      // Mostrar notificación de error
      toast.error("No se completó el registro. Intenta nuevamente.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, password, address, phone } = formData

    // Validaciones básicas
    if (!name || !email || !password || !address || !phone) {
      setError("Todos los campos son obligatorios")
      toast.error("Todos los campos son obligatorios")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo electrónico no es válido")
      toast.error("El correo electrónico no es válido")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      toast.error("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("El número de teléfono debe tener 10 dígitos")
      toast.error("El número de teléfono debe tener 10 dígitos")
      return
    }

    // Si pasa la validación, llamamos a la función onSubmit
    setError("")
    onSubmit(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Crear Cuenta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu nombre completo"
            />
          </div>
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
              placeholder="Crea una contraseña"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu dirección"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu número de teléfono"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
