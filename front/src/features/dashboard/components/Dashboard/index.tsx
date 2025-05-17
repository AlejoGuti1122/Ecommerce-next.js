"use client"

import { Iuser, eOrderStatus, eRole } from "@/interfaces"
import {
  FaUser,
  FaBox,
  FaCog,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBoxOpen,
} from "react-icons/fa"
import { useState } from "react"
import LogoutButton from "@/features/dashboard/components/Button"

// Usuario de ejemplo
const sampleUser: Iuser = {
  id: 1,
  name: "Juan Pérez",
  email: "juan@mail.com",
  address: "Calle 123",
  phone: "1234567890",
  role: eRole.USER, // Cambiamos "user" por eRole.USER
  orders: [
    {
      id: 1,
      status: eOrderStatus.PENDING,
      date: "2024-05-11",
      products: [],
      user: {} as Iuser,
    },
  ],
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container mx-auto p-4">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Pedidos</p>
              <h3 className="text-3xl font-bold">{sampleUser.orders.length}</h3>
            </div>
            <FaBoxOpen className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Pedidos Pendientes</p>
              <h3 className="text-3xl font-bold">
                {
                  sampleUser.orders.filter(
                    (order) => order.status === eOrderStatus.PENDING
                  ).length
                }
              </h3>
            </div>
            <FaBox className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Estado</p>
              <h3 className="text-xl font-bold">Cliente Activo</h3>
            </div>
            <FaUser className="text-4xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-2 px-6 py-4 ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            <FaUser /> <span>Perfil</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center space-x-2 px-6 py-4 ${
              activeTab === "orders"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            <FaBox /> <span>Pedidos</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center space-x-2 px-6 py-4 ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            <FaCog /> <span>Configuración</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FaUser className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="font-medium">{sampleUser.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{sampleUser.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FaPhone className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium">{sampleUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="font-medium">{sampleUser.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {sampleUser.orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.status === eOrderStatus.PENDING
                          ? "bg-yellow-400"
                          : order.status === eOrderStatus.APROVED
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === eOrderStatus.PENDING
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === eOrderStatus.APROVED
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default UserDashboard
