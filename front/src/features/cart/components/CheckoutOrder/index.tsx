"use client"

import { useAuth } from "@/context/authContext"
import { useCart } from "@/context/cartContext"
import { DtoOrder, postOrder } from "@/services/orders"
import { useRouter } from "next/navigation"
import { ImSpinner2 } from "react-icons/im"
import { FaCreditCard } from "react-icons/fa"
import { toast } from "react-toastify" // Asumo que estás usando toast

const CheckoutOrder = () => {
  const { total, toggleLoaderCheckout, cart, resetCart, checkoutLoader } =
    useCart()

  const { user, token } = useAuth()
  const router = useRouter()

  const onGenerateOrder = async () => {
    try {
      toggleLoaderCheckout()

      if (!user) return

      const data: DtoOrder = {
        userId: user!.id,
        products: cart.map((product) => product.id as number),
      }

      const order = await postOrder(data, token || "")

      toast.success(`Orden: #${order.id} success generated`)

      resetCart()

      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (e) {
      console.warn("Ocurrió un error al crear una orden", e)
      toast.error("Ocurrió un error al registrar la orden")
    }
  }

  return (
    <div className="w-full">
      <button
        disabled={total === 0 || checkoutLoader} // deshabilita mientras carga
        onClick={onGenerateOrder}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 
            text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg
            transform hover:scale-[1.02] transition-all duration-300
            flex items-center justify-center space-x-2
            ${
              total === 0 || checkoutLoader
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
      >
        {checkoutLoader ? (
          <>
            <ImSpinner2 className="animate-spin" />
            <span>Procesando orden...</span>
          </>
        ) : (
          <>
            <FaCreditCard />
            <span>Finalizar compra</span>
          </>
        )}
      </button>
    </div>
  )
}

export default CheckoutOrder
