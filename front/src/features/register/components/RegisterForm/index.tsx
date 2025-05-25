"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { postRegister } from "@/services/service-auth"
import usePublic from "@/hooks/usePublic"

export interface IRegistrationForm {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

const RegisterForm = () => {
  usePublic()
  const router = useRouter()

  const [formData, setFormData] = useState<IRegistrationForm>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (data: IRegistrationForm) => {
    try {
      await postRegister(data)
      toast.success("¡Registro exitoso! 😁🎉")
      setError("")
      setTimeout(() => router.push("/login"), 3000)
    } catch (e) {
      console.error("Error al registrar:", e)
      toast.error("No se completó el registro. Intenta nuevamente.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, password, address, phone } = formData

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

    setError("")
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {["name", "email", "password", "address", "phone"].map((field, idx) => (
        <div
          className="mb-4"
          key={idx}
        >
          <label
            htmlFor={field}
            className="block text-sm font-medium text-gray-300 capitalize"
          >
            {field === "name"
              ? "Nombre Completo"
              : field === "email"
              ? "Correo Electrónico"
              : field === "password"
              ? "Contraseña"
              : field === "address"
              ? "Dirección"
              : "Teléfono"}
          </label>
          <input
            type={field === "password" ? "password" : "text"}
            id={field}
            name={field}
            value={formData[field as keyof IRegistrationForm]}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Ingresa tu ${field}`}
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 px-4 rounded-md hover:opacity-90 transition"
      >
        Registrarse
      </button>
    </form>
  )
}

export default RegisterForm
