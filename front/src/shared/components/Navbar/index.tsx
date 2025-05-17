"use client"
import Link from "next/link"
import { useAuth } from "@/context/authContext" // Importa el contexto de autenticación
import { logout } from "@/services/auth" // Importa la función de logout
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa"

const Navbar = () => {
  const { isAuthenticated, setAuthenticated } = useAuth() // Accede al estado de autenticación
  const router = useRouter()

  const handleLogout = () => {
    logout() // Elimina la cookie del token
    setAuthenticated(false) // Actualiza el estado de autenticación
    router.push("/login") // Redirige al login
  }

  const handleCartClick = () => {
    if (!isAuthenticated) {
      router.push("/login") // Redirige al login si no está autenticado
      return
    }
    router.push("/cart") // Redirige al carrito si está autenticado
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Nombre */}
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TechZone
            </span>
          </Link>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar dispositivos..."
                className="w-full px-4 py-2 rounded-lg bg-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Iconos de usuario y carrito */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={handleCartClick}
                className="hover:text-purple-400 transition-colors"
              >
                <FaShoppingCart className="text-xl" />
              </button>
            )}

            {isAuthenticated ? (
              // Opciones para usuarios autenticados
              <div className="flex items-center space-x-4">
                <Link
                  href="/account"
                  className="hover:text-purple-400 transition-colors"
                >
                  <FaUser className="text-xl" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              // Opción para usuarios no autenticados
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
