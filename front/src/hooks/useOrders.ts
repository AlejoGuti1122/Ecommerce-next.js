// import { useState, useEffect } from "react"

// export const useOrders = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null) // Asegúrate de que el estado de error sea de tipo string o null

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("authToken")
//         const userId = localStorage.getItem("userId") // Obtén el userId desde localStorage o el contexto de autenticación

//         if (!token || !userId) {
//           throw new Error("No se encontró el token o el userId.")
//         }

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_EXPRESS_API}/orders`,
//           {
//             method: "GET", // Cambia a POST si el backend lo requiere
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ userId }), // Envía el userId en el cuerpo
//           }
//         )

//         if (!res.ok) {
//           throw new Error("Error al obtener el historial de compras.")
//         }

//         const data = await res.json()
//         setOrders(data)
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message) // Accede a la propiedad message si es del tipo Error
//         } else {
//           setError("Ocurrió un error desconocido.") // Manejo de errores genéricos
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [])

//   return { orders, loading, error }
// }
