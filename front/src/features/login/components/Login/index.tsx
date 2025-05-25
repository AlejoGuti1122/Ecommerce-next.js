"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useAuth } from "@/context/authContext"
import { postLogin } from "@/services/service-auth"
import usePublic from "@/hooks/usePublic"

import LoginLayout from "../LoginLayout"
import LoginForm from "../LoginForm"

export interface ILoginInput {
  email: string
  password: string
}

export default function LoginPage() {
  usePublic()
  const router = useRouter()
  const { saveUserData } = useAuth()

  const [formData, setFormData] = useState<ILoginInput>({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password } = formData
    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      const data = await postLogin(formData)
      saveUserData(data)
      toast.success("¡Inicio de sesión exitoso!")
      router.push("/")
    } catch (e) {
      console.error("Error al iniciar sesión:", e)
      toast.error("Error al iniciar sesión. Verifica tus credenciales.")
    }
  }

  return (
    <LoginLayout>
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </LoginLayout>
  )
}
