import { useEffect, useState } from "react"
import { IOrder } from "@/interfaces"
import { getUsersOrders } from "@/services/orders"

// Hook personalizado que recibe un token de autenticación
export default function useUserOrders(token: string | null | undefined) {
  // Estado para guardar las órdenes del usuario
  const [orders, setOrders] = useState<IOrder[]>([])

  // Estado para indicar si se está cargando la data
  const [loading, setLoading] = useState(true)

  // Estado para guardar cualquier error que ocurra
  const [error, setError] = useState<string | undefined>()

  // Efecto que se ejecuta cuando el hook se monta o cuando cambia el token
  useEffect(() => {
    // Función asíncrona que trae las órdenes del usuario
    const fetchOrders = async () => {
      try {
        // Si no hay token, no se hace la petición
        if (!token) return

        // Llamamos al servicio que obtiene las órdenes y guardamos la respuesta
        const res = await getUsersOrders(token)

        // Guardamos las órdenes obtenidas en el estado
        setOrders(res)
      } catch (err: unknown) {
        // Manejamos el error si es una instancia de Error
        if (err instanceof Error) {
          setError(err.message)
          console.error(err)
        } else {
          // Si el error no es del tipo esperado, mostramos un mensaje genérico
          setError("Error al obtener las órdenes")
          console.error("Error desconocido", err)
        }
      } finally {
        // Finaliza la carga, sea con éxito o con error
        setLoading(false)
      }
    }

    // Ejecutamos la función para traer las órdenes
    fetchOrders()
  }, [token]) // El efecto se vuelve a ejecutar si el token cambia

  // Devolvemos los datos necesarios para ser usados en el componente
  return { orders, loading, error }
}
