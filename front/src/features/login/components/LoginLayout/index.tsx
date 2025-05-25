import React from "react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Iniciar Sesión
        </h1>
        {children}
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
