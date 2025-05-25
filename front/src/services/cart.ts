import axios from "axios";
import { IOrder } from "@/interfaces";

// Base URL de la API, definida en las variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API;


export const fetchCartService = async (token: string): Promise<IOrder> => {
  try {
    // Realizamos la petición GET al endpoint /cart con el token en headers
    const res = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Autorización con Bearer token JWT
      },
    });

    // Retornamos los datos que nos devuelve la API (el carrito)
    return res.data;
  } catch (error) {
    // En caso de error, lo logueamos para debugging
    console.error("Error al obtener el carrito:", error);

    // Lanzamos un nuevo error para que quien use este servicio pueda capturarlo y manejarlo
    throw new Error("No se pudo cargar el carrito. Inténtalo más tarde.");
  }
};
