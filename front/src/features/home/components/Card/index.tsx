/* eslint-disable @next/next/no-img-element */
"use client"
import { IProduct } from "@/interfaces"

// Datos de ejemplo de productos
const sampleProducts: IProduct[] = [
  {
    id: 1,
    name: "MacBook Pro M2",
    price: 1299,
    description:
      "La nueva MacBook Pro con chip M2, 8GB RAM, 256GB SSD. Potencia y rendimiento excepcional para profesionales.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3",
    categoryId: 1,
    stock: 10,
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    price: 999,
    description:
      "iPhone 14 Pro 256GB, Dynamic Island, cámara 48MP, pantalla ProMotion. El iPhone más avanzado.",
    image:
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3",
    categoryId: 2,
    stock: 15,
  },
  {
    id: 3,
    name: "iPad Air M1",
    price: 599,
    description:
      "iPad Air con chip M1, 64GB, WiFi. Perfecto para creativos y profesionales que buscan portabilidad.",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3",
    categoryId: 3,
    stock: 8,
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 249,
    description:
      "AirPods Pro 2da generación. Cancelación activa de ruido, audio espacial y el mejor sonido.",
    image:
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3",
    categoryId: 4,
    stock: 20,
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    price: 399,
    description:
      "Apple Watch Series 8 GPS 45mm. Sensores avanzados, detector de accidentes y monitoreo de salud.",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3",
    categoryId: 5,
    stock: 12,
  },
  {
    id: 6,
    name: 'iMac 24" M1',
    price: 1299,
    description:
      "iMac 24 pulgadas con chip M1, 8GB RAM, 256GB SSD. Diseño ultradelgado y rendimiento extraordinario.",
    image:
      "https://cdn01.zoomit.ir/2021/12/apple-imac-24-inch-2021-m1-7-core-gpu-back.jpg",
    categoryId: 1,
    stock: 5,
  },
]

export function Card() {
  return (
    <>
      {sampleProducts.map((product) => (
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
            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>

            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-blue-600">
                ${product.price}
              </p>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Stock: {product.stock}
              </span>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>

            <button
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white py-2 rounded-lg font-medium"
            >
              Ver Producto
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
