/* eslint-disable @next/next/no-img-element */
"use client"
import { IOrder, eOrderStatus, eRole } from "@/interfaces"
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaCreditCard,
} from "react-icons/fa"
import { useState } from "react"

const sampleOrder: IOrder = {
  id: 1,
  status: eOrderStatus.PENDING,
  date: "2024-05-10",
  user: {
    id: 1,
    name: "Juan Pérez",
    email: "juan@mail.com",
    address: "Calle 123",
    phone: "1234567890",
    role: eRole.ADMIN,
    orders: [],
  },
  products: [
    {
      id: 1,
      name: "iPhone 13",
      price: 799,
      description: "El último iPhone con características increíbles",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6443/6443289cv11d.jpg",
      categoryId: 1,
      stock: 10,
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 1299,
      description: "Potente laptop para profesionales",
      image:
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large_2x.jpg",
      categoryId: 2,
      stock: 5,
    },
  ],
}

const CartView = () => {
  const [order, setOrder] = useState<IOrder>(sampleOrder)
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(order.products.map((p) => [p.id!, 1]))
  )

  // Función para actualizar cantidades
  const handleQuantityChange = (productId: number, delta: number) => {
    const product = order.products.find((p) => p.id === productId)
    if (!product) return

    const newQuantity = Math.max(
      1,
      Math.min(quantities[productId] + delta, product.stock)
    )
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }))
  }

  // Función para eliminar productos
  const handleRemoveProduct = (productId: number) => {
    setOrder((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }))

    setQuantities((prev) => {
      const newQuantities = { ...prev }
      delete newQuantities[productId]
      return newQuantities
    })
  }

  const total = order.products.reduce(
    (acc, product) => acc + product.price * (quantities[product.id!] || 0),
    0
  )

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
        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <FaArrowLeft className="mr-2" />
          Seguir Comprando
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          {order.products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tu carrito está vacío
            </div>
          ) : (
            order.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden 
                hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center p-4">
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg transform 
                        group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {product.description}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(product.id!, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full
                            bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>

                        <span className="w-8 text-center font-medium">
                          {quantities[product.id!]}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(product.id!, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full
                            bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-lg">
                          ${product.price * quantities[product.id!]}
                        </span>
                        <button
                          onClick={() => handleRemoveProduct(product.id!)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">${total}</span>
              </div>
            </div>

            <button
              onClick={() => console.log("Checkout clicked")}
              disabled={order.products.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg
                transform hover:scale-[1.02] transition-all duration-300
                flex items-center justify-center space-x-2
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCreditCard />
              <span>Proceder al Pago</span>
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              Pago seguro y encriptado
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartView
