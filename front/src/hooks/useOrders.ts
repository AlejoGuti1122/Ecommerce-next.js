// import { IOrder } from "@/interfaces";
// import { useState, useEffect } from "react";

// export const useOrders = () => {
//   const [orders, setOrders] = useState<IOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const userId = localStorage.getItem("userId");

//         if (!token || !userId) {
//           throw new Error("No se encontró el token o el userId.");
//         }

//         // Cambia a POST si necesitas enviar el userId en el cuerpo
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_EXPRESS_API}/orders?userId=${userId}`, // Envía el userId como parámetro en la URL
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Error al obtener el historial de compras.");
//         }

//         const data: IOrder[] = await res.json();
//         setOrders(data);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Ocurrió un error desconocido.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return { orders, loading, error };
// };