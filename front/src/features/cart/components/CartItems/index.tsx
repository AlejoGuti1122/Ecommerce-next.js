/* eslint-disable @next/next/no-img-element */
"use client"

import { useCart } from "@/context/cartContext" // 👈 importa tu contexto
import { ImSpinner2 } from "react-icons/im"

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

const CartItems = ({ products }: CartItemsProps) => {
  const { checkoutLoader } = useCart() // 👈 accede al estado global

  if (checkoutLoader) {
    return (
      <div className="flex justify-center items-center p-10">
        <ImSpinner2 className="animate-spin text-4xl text-blue-600" />
      </div>
    )
  }

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg overflow-hidden 
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
              <h3 className="font-semibold text-lg text-white">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm">{product.description}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg text-white">${product.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItems
