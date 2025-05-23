"use client"

import { useCart } from "@/context/cartContext"
import { useEffect, useState } from "react"

import CartItems from "../CartItems"
import CheckoutOrder from "../CheckoutOrder"
import usePrivate from "@/hooks/usePrivate"

const CartView = () => {
  usePrivate()

  const { cart, removeProductFromCart } = useCart()
  const [hydrated, setHydrated] = useState(false)

  // Asegúrate de que el componente esté hidratado en el cliente
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Mostrar un estado de carga mientras se hidrata el componente
  if (!hydrated) {
    return <div>Cargando...</div>
  }

  // Función para manejar la eliminación de un producto del carrito
  const onTrashClick = (id: number) => {
    console.log(`Producto con ID ${id} eliminado del carrito.`)
    removeProductFromCart(id)
  }

  // Función para finalizar la compra

  // Cálculo del total basado en `cart`
  const calculatedCartTotal = cart.reduce(
    (acc, product) => acc + product.price,
    0
  )

  // Mostrar mensaje si el carrito está vacío
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          <CartItems
            products={cart}
            onRemove={() => null}
          />
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
            </div>

            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">${calculatedCartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartView
