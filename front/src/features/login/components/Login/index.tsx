"use client"
import React, { useState } from "react"

export default function   LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo electrónico no es válido")
      return
    }

    // Si pasa la validación
    setError("")
    console.log("Submit exitoso")
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            href="#"
            className="text-blue-500 hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
