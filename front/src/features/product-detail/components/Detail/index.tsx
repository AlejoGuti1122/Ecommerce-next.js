/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { IProduct } from "@/interfaces"

// Datos de ejemplo
export const sampleProduct: IProduct = {
  id: 1,
  name: "MacBook Pro M2",
  price: 1299,
  description:
    "La nueva MacBook Pro con el revolucionario chip M2, hasta 20 horas de duración de batería y un espectacular display Liquid Retina XDR.",
  image:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000",
  categoryId: 2,
  stock: 10,
}

interface DetailProps {
  product: IProduct
}

const Detail = ({ product }: DetailProps) => {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      // Cambiamos sampleProduct por product
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    console.log("Agregando al carrito:", {
      product, // Usamos product en lugar de sampleProduct
      quantity,
    })
  }

  const subtotal = quantity * product.price

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna de imagen */}
        <div className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg object-cover transition-transform 
              duration-300 group-hover:scale-105"
          />
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm
            ${product.stock > 0 ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            Stock: {product.stock}
          </span>
        </div>

        {/* Columna de detalles */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="ml-2 text-sm text-gray-500">USD</span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Contador y botón de agregar */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            <div className="text-lg font-semibold text-gray-700">
              Subtotal: ${subtotal}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg
                hover:bg-blue-700 transition-all duration-200
                flex items-center justify-center space-x-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transform hover:scale-[1.02]"
            >
              <span>Agregar al Carrito</span>
            </button>
          </div>

          {/* Información adicional */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Características</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Entrega inmediata</li>
              <li>Garantía de 1 año</li>
              <li>Soporte técnico incluido</li>
              <li>Envío gratis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
