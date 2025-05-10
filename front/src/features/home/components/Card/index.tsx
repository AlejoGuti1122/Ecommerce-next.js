/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/interfaces"

interface CardProps {
  product: IProduct
}

export function Card({ product }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 font-bold text-lg mb-2">
        ${product.price}
      </p>
      <p className="text-gray-500 text-sm mb-2">Stock: {product.stock}</p>
      <p className="text-gray-700 text-sm line-clamp-3">
        {product.description}
      </p>
    </div>
  )
}