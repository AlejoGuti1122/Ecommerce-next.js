/* eslint-disable @next/next/no-img-element */
"use client"

import { IProduct } from "@/interfaces"
import { motion } from "framer-motion"
import AddToCartButton from "../ButtonAdd"

interface ProductDetailProps {
  product: IProduct
}

const Detail = ({ product }: ProductDetailProps) => {
  return (
    <motion.div
      className="bg-white border rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen del producto */}
        <motion.div
          className="flex-1"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </motion.div>

        {/* Detalles del producto */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Categoría: <span className="font-medium">{product.categoryId}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Stock disponible:{" "}
            <span className="font-medium">{product.stock}</span>
          </p>

          {/* Botón de agregar al carrito */}
          <AddToCartButton product={product} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Detail
