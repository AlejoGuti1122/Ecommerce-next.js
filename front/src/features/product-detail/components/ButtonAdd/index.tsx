// components/AddToCartButton.tsx
"use client"

import { motion } from "framer-motion"
import { IProduct } from "@/interfaces"
import { toast } from "react-toastify"
import { useCart } from "@/context/cartContext"
import { useAuth } from "@/context/authContext"

interface AddToCartButtonProps {
  product: IProduct
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  // Hook para manipular el carrito de compras
  const { addProductToCart } = useCart()
  // Hook para obtener información del usuario autenticado
  const { user } = useAuth()

  // Función que se ejecuta al hacer clic en el botón para agregar producto al carrito
  const handleAddToCart = async () => {
    // Si no hay usuario autenticado, se muestra mensaje de error y se detiene la acción
    if (!user) {
      toast.error("Debes iniciar sesión para agregar productos al carrito.")
      return
    }

    try {
      // Intentar agregar el producto al carrito usando el contexto
      await addProductToCart(product)
      // Mostrar mensaje de éxito con el nombre del producto agregado
      toast.success(`¡${product.name} agregado(s) al carrito!`)
    } catch (error) {
      // En caso de error, mostrar en consola y un mensaje de error al usuario
      console.error("Error al agregar el producto al carrito:", error)
      toast.error("No se pudo agregar el producto al carrito.")
    }
  }

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={!user}
      className={`px-6 py-3 rounded-lg shadow-md transition-all ${
        user
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
      whileHover={user ? { scale: 1.05 } : {}}
      whileTap={user ? { scale: 0.95 } : {}}
    >
      {user ? "Agregar al carrito" : "Inicia sesión para comprar"}
    </motion.button>
  )
}

export default AddToCartButton
