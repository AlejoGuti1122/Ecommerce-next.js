/* eslint-disable @next/next/no-img-element */
"use client"
import { IProduct } from "@/interfaces"
import Link from "next/link"

interface CardProps {
  product: IProduct // Define que el componente recibe un producto como prop
}

export const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="bg-white border rounded-xl p-4 shadow-lg hover:shadow-xl 
        transition-all duration-300"
    >
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-blue-600">${product.price}</p>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Stock: {product.stock}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <Link href={`/product-detail/${product.id}`}>
          <button
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 
          text-white py-2 rounded-lg font-medium"
          >
            Ver Producto
          </button>
        </Link>
      </div>
    </div>
  )
}
