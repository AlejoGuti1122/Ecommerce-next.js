import React from "react"
import RegisterForm from "../RegisterForm"

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Crear Cuenta
        </h1>
        <RegisterForm />
        <p className="mt-4 text-center text-gray-400 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
