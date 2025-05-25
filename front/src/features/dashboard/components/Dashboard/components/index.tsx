"use client"

import usePrivate from "@/hooks/usePrivate"
import { useAuth } from "@/context/authContext"
import LogoutButton from "../../Button"
import UserInfo from "../../UserInfo.tsx"
import OrdersList from "../../OrderList"
import useUserOrders from "@/hooks/useOrders"

export default function UserDashboard() {
  usePrivate()
  const { user, token } = useAuth()
  const { orders, loading, error } = useUserOrders(token)

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        No se pudo cargar el usuario.
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-6 bg-gradient-to-r from-indigo-900 to-purple-800 rounded-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, {user.name}
        </h1>
        <LogoutButton />
      </div>

      <UserInfo user={user} />
      <OrdersList
        orders={orders}
        loading={loading}
        error={error}
      />
    </div>
  )
}
