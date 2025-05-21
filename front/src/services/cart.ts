import axios from "axios";
import { IOrder } from "@/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API;

export const fetchCartService = async (token: string): Promise<IOrder> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw new Error("No se pudo cargar el carrito. Inténtalo más tarde.");
  }
};