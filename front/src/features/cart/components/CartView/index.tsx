"use client"

import { useCart } from "@/context/cartContext"
import { useEffect, useState } from "react"
import CartItems from "../CartItems"
import CheckoutOrder from "../CheckoutOrder"
import usePrivate from "@/hooks/usePrivate"

const CartView = () => {
  // Hook personalizado que probablemente verifica si el usuario está autenticado antes de mostrar la vista
  usePrivate()

  // Trae el carrito y la función para eliminar productos del contexto global
  const { cart, removeProductFromCart } = useCart()

  // Estado para saber si el componente ya está montado (hidratado) en el cliente
  const [hydrated, setHydrated] = useState(false)

  // useEffect se usa aquí para marcar el componente como "hidratado" una vez que se monta en el cliente
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Si el componente aún no está hidratado, se muestra un mensaje de carga
  if (!hydrated) {
    return <div>Cargando...</div>
  }

  // Función que se ejecuta al hacer clic en "Eliminar" un producto del carrito
  // Muestra en consola el ID del producto eliminado y llama a removeProductFromCart para eliminarlo del contexto
  const onTrashClick = (id: number) => {
    console.log(`Producto con ID ${id} eliminado del carrito.`)
    removeProductFromCart(id)
  }

  // Calcula el total del carrito sumando los precios de todos los productos
  const calculatedCartTotal = cart.reduce(
    (acc, product) => acc + product.price,
    0
  )

  // Si el carrito está vacío, muestra un mensaje centrado
  if (cart.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Tu carrito está vacío
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
          bg-clip-text text-transparent"
        >
          Tu Carrito
        </h1>
        <CheckoutOrder />
        {/* Botón o acción de finalizar compra */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          <CartItems
            products={cart}
            onRemove={() => null}
          />
          {/* Este componente muestra los productos. 
              Nota: El prop `onRemove` se pasa como función vacía aquí. 
              Probablemente no se está usando internamente o se maneja en otro lugar. */}
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>

            <div className="space-y-3 mb-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  <span>{product.name}</span>
                  <button
                    onClick={() => onTrashClick(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              {/* Renderiza cada producto con su nombre y un botón para eliminarlo */}
            </div>

            <div className="h-px bg-gray-200 my-2"></div>
            {/* Línea divisoria visual */}

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">${calculatedCartTotal}</span>
              {/* Muestra el total calculado del carrito */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartView
// Exporta el componente para ser usado en una ruta como /cart
