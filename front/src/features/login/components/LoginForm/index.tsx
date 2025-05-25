"use client"
import React from "react"
import { ILoginInput } from "../Login"

interface Props {
  formData: ILoginInput
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  error: string
}

export default function LoginForm({
  formData,
  onChange,
  onSubmit,
  error,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
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
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
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
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md"
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
  )
}
