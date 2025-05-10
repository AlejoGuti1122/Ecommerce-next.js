"use client"
import Link from "next/link"
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaMobileAlt,
  FaLaptop,
  FaTablet,
  FaHeadphones,
} from "react-icons/fa"

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Nombre */}
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
            <FaLaptop className="text-2xl text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TechZone
            </span>
          </Link>

          {/* Categorías */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/category/phones"
              className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <FaMobileAlt />
              <span>Celulares</span>
            </Link>
            <Link
              href="/category/laptops"
              className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <FaLaptop />
              <span>Laptops</span>
            </Link>
            <Link
              href="/category/tablets"
              className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <FaTablet />
              <span>Tablets</span>
            </Link>
            <Link
              href="/category/accessories"
              className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <FaHeadphones />
              <span>Accesorios</span>
            </Link>
          </div>

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
            <Link
              href="/cart"
              className="hover:text-purple-400 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
            </Link>
            <Link
              href="/profile"
              className="hover:text-purple-400 transition-colors"
            >
              <FaUser className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
