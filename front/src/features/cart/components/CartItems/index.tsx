/* eslint-disable @next/next/no-img-element */
"use client"

import { FaTrash } from "react-icons/fa"
import { useCart } from "@/context/cartContext" // 👈 importa tu contexto

interface CartItemsProps {
  products: {
    id: number
    name: string
    description: string
    price: number
    image: string
  }[]
  onRemove: (productId: number) => void
}

const CartItems = ({ products, onRemove }: CartItemsProps) => {
  const { checkoutLoader } = useCart() // 👈 accede al estado global

  if (checkoutLoader) {
    return <p>Loading...</p> // 👈 estado de carga real
  }

  return (
    <>
      {products.map((product) => (
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
              <p className="text-gray-500 text-sm">{product.description}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg">${product.price}</span>
                </div>

                <button
                  onClick={() => onRemove(product.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItems
