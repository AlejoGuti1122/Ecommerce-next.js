/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaUser, FaSearch, FaSpinner } from "react-icons/fa"
import { useCart } from "@/context/cartContext"
import { useSearch } from "@/hooks/useSearch" // ajusta la ruta según tu estructura
import { useRef, useEffect } from "react"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { total } = useCart()

  // Hook personalizado para búsqueda
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showResults,
    hideResults,
  } = useSearch()

  // Ref para el contenedor de búsqueda
  const searchRef = useRef<HTMLDivElement>(null)

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        hideResults()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [hideResults])

  const handleLogout = () => {
    logout()
  }

  const handleCartClick = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    router.push("/cart")
  }

  // Función para ir al detalle del producto
  const handleProductClick = (productId: number) => {
    // Redirige usando tu estructura existente: product-detail/[slug]
    router.push(`/product-detail/${productId}`)
    hideResults()
    setSearchTerm("")
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white shadow-lg relative">
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
          <div
            className="hidden md:flex flex-1 max-w-md mx-6"
            ref={searchRef}
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar iPhone, MacBook, iPad..."
                className="w-full px-4 py-2 rounded-lg bg-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200 placeholder-gray-400"
              />
              <div className="absolute right-3 top-3">
                {isSearching ? (
                  <FaSpinner className="text-gray-400 animate-spin" />
                ) : (
                  <FaSearch className="text-gray-400" />
                )}
              </div>

              {/* Resultados de búsqueda */}
              {showResults && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.slice(0, 8).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 border-b border-gray-100 flex items-center space-x-3"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium text-sm">
                              {product.name}
                            </p>
                            <p className="text-green-600 font-bold text-sm">
                              ${product.price.toLocaleString()}
                            </p>
                          </div>
                        </button>
                      ))}
                      {searchResults.length > 8 && (
                        <div className="px-4 py-2 text-center text-gray-500 text-sm">
                          y {searchResults.length - 8} productos más...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <FaSearch className="mx-auto mb-2 text-2xl" />
                      <p>No se encontraron productos</p>
                      <p className="text-sm">Intenta con otro término</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Iconos de usuario y carrito */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={handleCartClick}
                className="hover:text-purple-400 transition-colors relative"
              >
                {total > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {total}
                  </span>
                )}
                <FaShoppingCart className="text-xl" />
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
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
