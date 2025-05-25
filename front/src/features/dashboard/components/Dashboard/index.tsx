"use client" // Indica que este componente se renderiza del lado del cliente (Client Component)

import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa" 
import LogoutButton from "../Button" 
import { useAuth } from "@/context/authContext" 
import { useEffect, useState } from "react" 
import { IOrder } from "@/interfaces" 
import { getUsersOrders } from "@/services/orders" 
import usePrivate from "@/hooks/usePrivate" 

export default function UserDashboard() {
  usePrivate()
  
  // Protege el acceso: redirige si el usuario no está autenticado

  const { user, token } = useAuth() // Obtiene la info del usuario y el token desde el contexto global
  const [orders, setOrders] = useState<IOrder[]>() // Estado local para guardar las órdenes del usuario

  // Hook que se ejecuta cuando se obtiene el token
  useEffect(() => {
    const request = async () => {
      try {
        const res = await getUsersOrders(token!) // Llama al backend para obtener las órdenes del usuario
        setOrders(res) // Guarda las órdenes en el estado
      } catch (e: any) {
        console.warn("Error al obtener las ordenes", e.message) // Muestra un error si falla la petición
      }
    }

    if (token) {
      request() // Solo ejecuta si el token está disponible (usuario autenticado)
    }
  }, [token])

  // Si no hay usuario, se muestra un mensaje de error
  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        No se pudo cargar el usuario.
      </p>
    )

  // Render principal del dashboard
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-6 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-md">
      {/* Header del dashboard */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, {user.name}
        </h1>
        <LogoutButton /> {/* Botón para cerrar sesión */}
      </div>

      {/* Info básica del usuario (nombre, email, rol) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUser className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Nombre</p>
            <p>{user.name}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaEnvelope className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Correo</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaSignOutAlt className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Rol</p>
            <p>{user.role}</p>
          </div>
        </div>
      </div>

      {/* Sección de órdenes del usuario */}
      {orders?.length ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-white">Tus compras</h2>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                {/* Encabezado de cada orden */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Orden #{order.id}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}{" "}
                    {/* Fecha legible */}
                  </span>
                </div>

                {/* Estado de la orden */}
                <p className="text-sm text-gray-600 mb-4">
                  Estado: <span className="font-medium">{order.status}</span>
                </p>

                {/* Lista de productos de la orden */}
                <div className="space-y-2">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>{product.name}</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total de la orden */}
                <div className="mt-4 font-semibold text-right">
                  Total: $
                  {order.products
                    .reduce((acc, product) => acc + product.price, 0)
                    .toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Si no hay órdenes
        <p className="mt-10 text-center text-gray-500">
          No tienes compras registradas.
        </p>
      )}
    </div>
  )
}
