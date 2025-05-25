import React from "react"

// Componente funcional que actúa como layout para la página de login
// Recibe un prop llamado "children" que representa el contenido anidado dentro del layout
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode // Todo lo que este dentro de loginLayout sera pasado a la prop children
}) {
  return (
    // Contenedor principal que centra su contenido vertical y horizontalmente,
    // ocupa toda la altura de la pantalla y tiene un fondo degradado oscuro
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Caja central que contiene el formulario de login
          Tiene fondo gris oscuro, padding, bordes redondeados y sombra */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Título principal centrado con texto blanco y tamaño grande */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Iniciar Sesión
        </h1>

        {/* Aquí se renderiza el contenido hijo que se pase dentro del layout,
            generalmente será el formulario de login */}
        {children}

        {/* Texto pequeño al pie con enlace para ir a la página de registro */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline" // Estilo para enlace azul que subraya al pasar el mouse
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
