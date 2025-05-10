/* eslint-disable @next/next/no-img-element */
"use client"
import { IOrder, eOrderStatus, eRole } from "@/interfaces"

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
    orders: []
  },
  products: [
    {
      id: 1,
      name: "iPhone 13",
      price: 799,
      description: "El último iPhone con características increíbles",
      image: "https://ejemplo.com/iphone.jpg",
      categoryId: 1,
      stock: 10
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 1299,
      description: "Potente laptop para profesionales",
      image: "https://ejemplo.com/macbook.jpg",
      categoryId: 2,
      stock: 5
    }
  ]
}

const CartView = () => {
  // Calcular el total
  const total = sampleOrder.products.reduce((acc, product) => acc + product.price, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
      
      {/* Información del usuario */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Información del Cliente</h2>
        <p>Nombre: {sampleOrder.user.name}</p>
        <p>Email: {sampleOrder.user.email}</p>
        <p>Dirección: {sampleOrder.user.address}</p>
      </div>

      {/* Lista de productos */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleOrder.products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total y botones */}
      <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <div>
          <span className="text-lg font-semibold">Total: </span>
          <span className="text-2xl font-bold">${total}</span>
        </div>
        <div className="space-x-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Vaciar Carrito
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartView